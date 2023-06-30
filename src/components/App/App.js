// корневой компонент приложения
import { useEffect, useState } from 'react';
import { useLocation, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import SignOut from '../SignOut/SignOut';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';
import {
  checkToken,
  authorize,
  register,
  editProfile
} from '../../utils/MainApi';
import {
  getSavedMovie,
  createMovie,
  getDeleteMovie
} from '../../utils/MainApi';
import { getAllMovies } from '../../utils/MoviesApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';

const App = () => {
  const [initialFilms, setInitialFilms] = useState([]); // все фильмы
  const [savedFilms, setSavedFilms] = useState([]); // фильмы где установлен лайк
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpened, setMenuOpened] = useState(false);
  const [isNotifyPopupOpen, setIsNotifyPopupOpen] = useState(false);
  const [statusCompleted, setStatusCompleted] = useState(true);
  const [errorMessage, setErrorMessage] = useState(true);
  const [currentUser, setСurrentUser] = useState({
    name: 'загрузка...',
    email: 'загрузка...',
    _id: ''
  });
  const location = useLocation();
  const showHeaderPaths = ['/', '/movies', '/saved-movies', '/profile']; // пути, на которых нужно отобразить Header
  const showHeader = showHeaderPaths.includes(location.pathname); // проверяем, соответствует ли текущий путь одному из путей для отображения Header
  const navigate = useNavigate();
  const currentUrl = location.pathname;

  const handleMenuOpened = (value) => {
    setMenuOpened(value);
  };
  function handleError (err) {
    setErrorMessage(err.message || 'Ошибка! Что-то пошло не так');
    setStatusCompleted(false);
    setIsNotifyPopupOpen(true);
    console.log(err);
  }

  function handleAuth (email, password, name, authFunction) {
    setIsLoading(true);
    authFunction(email, password, name)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          setStatusCompleted(
            'Вы успешно вошли! Сейчас вы будете переадресованы на страницу "Фильмы"'
          );
          setIsNotifyPopupOpen(true);
          const { email, name } = data;
          setСurrentUser({ email, name });
          setTimeout(() => {
            navigate('/movies', { replace: true });
            setIsNotifyPopupOpen(false);
          }, 2000);
        } else if (data.message || data.error) {
          throw new Error(data.message || data.error);
        } else {
          throw new Error('Ошибка! Что-то пошло не так');
        }
      })
      .catch((err) => {
        setErrorMessage(err.message || 'Ошибка! Что-то пошло не так');
        setStatusCompleted(false);
        setIsNotifyPopupOpen(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogin (email, password) {
    handleAuth(email, password, null, authorize);
  }

  function handleRegister ({ email, password, name }) {
    handleAuth(email, password, name, register);
  }
  function handleEditProfile ({ email, name }) {
    setIsLoading(true);
    editProfile({ email, name })
      .then((data) => {
        const { email, name } = data;
        setСurrentUser({ email, name });
        setIsNotifyPopupOpen(true);
        setStatusCompleted('Данные успешно обновлены!');
      })
      .catch(handleError)
      .finally(() => setIsLoading(false));
  }
  // функция сохраняет фильм на сервере
  function handleLikeMovie (movie, setIsliked) {
    document.body.style.cursor = 'wait';
    createMovie(movie)
      .then((movie) => {
        const newSavedFilms = [...savedFilms, movie];
        setSavedFilms(newSavedFilms);
        localStorage.setItem('savedFilms', JSON.stringify(newSavedFilms));
        setIsliked(true);
      })
      .catch(handleError)
      .finally(() => (document.body.style.cursor = 'default'));
  }
  // функция обращается на сервер и удаляет карточку со списка любимых фильмов
  function handleDislikeMovie (id, setIsliked) {
    document.body.style.cursor = 'wait';
    getDeleteMovie(id)
      .then((movie) => {
        const newSavedFilms = savedFilms.filter(
          (film) => film._id !== movie._id
        );
        setIsliked && setIsliked(false);
        setSavedFilms(newSavedFilms);
        localStorage.setItem('savedFilms', JSON.stringify(newSavedFilms));
      })
      .catch(handleError)
      .finally(() => (document.body.style.cursor = 'default'));
  }
  function loadAllMoviesList () {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      Promise.all([getSavedMovie(), getAllMovies()])
        .then(([savedFilms, allFilms]) => {
          // Проход по массиву, сравнение и установка _id и liked
          const newallFilms = allFilms.map((newallFilm) => {
            const findedSavedMovie = savedFilms.find(
              (savedMovie) => savedMovie.movieId === newallFilm.id
            );
            newallFilm._id = findedSavedMovie?._id;
            newallFilm.liked = true;
            return newallFilm;
          });
          setSavedFilms(savedFilms);
          setInitialFilms(newallFilms);
          resolve({ savedFilms, newallFilms });
        })
        .catch(reject) // Отклонение промиса при ошибке
        .finally(() => setIsLoading(false));
    });
  }
  function loadSavedMoviesList () {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      getSavedMovie()
        .then((savedFilms) => {
          // Проход по массиву, сравнение и установка _id и liked
          setSavedFilms(savedFilms);
          resolve(savedFilms);
        })
        .catch(reject) // Отклонение промиса при ошибке
        .finally(() => setIsLoading(false));
    });
  }

  useEffect(() => { }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    loggedIn === false && token && setIsLoading(true);
    loggedIn === false &&
      token &&
      checkToken()
        .then((data) => {
          setIsLoading(true);
          setLoggedIn(true);
          const { email, name } = data;
          setСurrentUser({ email, name });
          navigate(currentUrl, { replace: true });
        })
        .catch((error) => {
          // setLoggedIn(false)
          console.error(error);
        })
        .finally(() => setIsLoading(false));
  }, [loggedIn]);

  if (isLoading) return <Preloader />;
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {showHeader && (
          <Header
            menuOpened={menuOpened}
            handleMenuOpened={handleMenuOpened}
            loggedIn={loggedIn}
          />
        )}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                initialFilms={initialFilms}
                setInitialFilms={setInitialFilms}
                savedFilms={savedFilms}
                setSavedFilms={setSavedFilms}
                loadAllMoviesList={loadAllMoviesList}
                onError={handleError}
                loggedIn={loggedIn}
                isLoading={isLoading}
                onLikeMovie={handleLikeMovie}
                onDislikeMovie={handleDislikeMovie}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loadSavedMoviesList={loadSavedMoviesList}
                savedFilms={savedFilms}
                setSavedFilms={setSavedFilms}
                onDislikeMovie={handleDislikeMovie}
                isLoading={isLoading}
                loggedIn={loggedIn}
                onError={handleError}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfile}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onLogin={handleLogin}
                loggedIn={loggedIn}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={handleRegister}
                loggedIn={loggedIn}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/signout"
            element={<SignOut onLoggedIn={setLoggedIn} />}
          />
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
  );
};

export default App;
