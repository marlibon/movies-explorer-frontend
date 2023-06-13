// корневой компонент приложения
import { useState } from 'react';
import { Navigate, Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Login from '../Login/Login'
import Register from '../Register/Register'
import SignOut from '../SignOut/SignOut'
import Profile from '../Profile/Profile';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = () => {

  }
  const handleRegister = () => {

  }
  return (
    <div className='page'>
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App;
