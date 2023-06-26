// корневой компонент приложения
import { useEffect, useState } from 'react';
import { useLocation, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login'
import Register from '../Register/Register'
import SignOut from '../SignOut/SignOut'
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';
import { checkToken, authorize, register, editProfile } from "../../utils/MainApi";
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [isNotifyPopupOpen, setIsNotifyPopupOpen] = useState(false);
  const [statusCompleted, setStatusCompleted] = useState(true);
  const [errorMessage, setErrorMessage] = useState(true);
  const [currentUser, setСurrentUser] = useState({ name: 'загрузка...', email: 'загрузка...', _id: '' });
  const location = useLocation();
  const showHeaderPaths = ['/', '/movies', '/saved-movies', '/profile']; // пути, на которых нужно отобразить Header
  const showHeader = showHeaderPaths.includes(location.pathname); // проверяем, соответствует ли текущий путь одному из путей для отображения Header
  const navigate = useNavigate();

  const handleMenuOpened = (value) => {
    setMenuOpened(value)
  }
  function handleError (err) {
    setErrorMessage(err.message || 'Ошибка! Что-то пошло не так')
    setStatusCompleted(false);
    setIsNotifyPopupOpen(true);
    console.log(err)
  }
  function handleLogin (email, password) {
    setIsLoading(true)
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          setLoggedIn(true);
          setStatusCompleted('Вы успешно вошли! Сейчас вы будете переадресованы на страницу "Фильмы"');
          setIsNotifyPopupOpen(true);

          setTimeout(() => {
            navigate('/movies', { replace: true });
            setIsNotifyPopupOpen(false)
          }, 2000)
        }
        else {
          throw new Error(data.message || 'Ошибка! Что-то пошло не так');
        }
      })
      .catch(err => {
        setErrorMessage(err.message || 'Ошибка! Что-то пошло не так')
        setStatusCompleted(false);
        setIsNotifyPopupOpen(true);
        console.log(err)
      })
      .finally(() => setIsLoading(false))

  }
  function handleRegister ({ email, password, name }) {
    setIsLoading(true)
    register(email, password, name)
      .then((res) => {
        if (res.message) {
          setErrorMessage(res.message);
          throw new Error(res.message);
        }
        if (res.error) {
          setErrorMessage(res.error);
          throw new Error(res.error);
        }
        if (res.token) {
          setLoggedIn(true)
          setStatusCompleted('Вы успешно зарегистрировались! Сейчас вы будете переадресованы на страницу "Фильмы"');
          setIsNotifyPopupOpen(true);
          setTimeout(() => {
            navigate('/movies', { replace: true });
          }, 2000)
          localStorage.setItem('token', res.token)
          const { email, name } = res;
          setСurrentUser({ email, name })
        }

      })
      .catch(handleError)
      .finally(() => setIsLoading(false))
  }
  function handleEditProfile ({ email, name }) {
    setIsLoading(true)
    editProfile({ email, name })
      .then((data) => {
        const { email, name } = data;
        setСurrentUser({ email, name })
      })
      .catch(handleError)
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    loggedIn === false && token && setIsLoading(true)
    loggedIn === false && token && checkToken()
      .then((data) => {
        setIsLoading(true)
        setLoggedIn(true)
        const { email, name } = data
        setСurrentUser({ email, name })

      })
      .catch(error => {
        // setLoggedIn(false)
        console.error(error)
      })
      .finally(() => setIsLoading(false))
  }, [loggedIn])

  if (isLoading) return (<Preloader />)
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        {showHeader && <Header menuOpened={menuOpened} handleMenuOpened={handleMenuOpened} loggedIn={loggedIn} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies"
            element={<ProtectedRoute element={Movies} loggedIn={loggedIn} onError={handleError} />}
          />
          <Route path="/saved-movies"
            element={<ProtectedRoute element={SavedMovies} loggedIn={loggedIn} onError={handleError} />}
          />
          <Route path="/profile"
            element={<ProtectedRoute element={Profile} loggedIn={loggedIn} onEditProfile={handleEditProfile} isLoading={isLoading} />}
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} isLoading={isLoading} />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} isLoading={isLoading} />} />
          <Route path="/signout" element={<SignOut onLoggedIn={setLoggedIn} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <InfoTooltip
          name="notify"
          isOpen={isNotifyPopupOpen}
          setPopupOpened={setIsNotifyPopupOpen}
          statusCompleted={statusCompleted}
          errorMessage={errorMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
