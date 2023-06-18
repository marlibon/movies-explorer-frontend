// корневой компонент приложения
import { useState } from 'react';
import { Navigate, Router, useLocation, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Login from '../Login/Login'
import Register from '../Register/Register'
import SignOut from '../SignOut/SignOut'
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const showHeaderPaths = ['/', '/movies', '/saved-movies', '/profile']; // пути, на которых нужно отобразить Header
  const showHeader = showHeaderPaths.includes(location.pathname); // проверяем, соответствует ли текущий путь одному из путей для отображения Header


  const handleLogin = () => {
  }
  const handleRegister = () => {
  }
  return (
    <div className='page'>
      {showHeader && <Header />}
      <Routes>
        {/* <Route path="/"
          element={<ProtectedRoute
            element={Main}
          />}
        /> */}
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login onLogin={handleLogin} isLoading={isLoading} />} />
        <Route path="/signup" element={<Register onRegister={handleRegister} isLoading={isLoading} />} />
        <Route path="/signout" element={<SignOut onLoggedIn={setLoggedIn} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
