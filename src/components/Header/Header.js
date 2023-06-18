// компонент, который отрисовывает шапку сайта на страницу
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Header.css';
import profileIcon from '../../images/profile-icon.svg';

const Header = () => {
  const navigate = useNavigate();
  const navigation = () => {
  }
  return (
    <header className='header'>


      <Routes>
        {/* для главной */}
        <Route path="/" element={
          <>
            <Logo />
            <nav className='header__nav-links'>
              <Link to="/signup" className='header__link'>Регистрация</Link>
              <Link to="/signin" className='header__link header__link_type_btn'>Войти</Link>
            </nav>
          </>
        } />
        {/* для остальных страниц */}
        <Route path="*" element={
          <>
            <nav className='header__nav-links'>
              <Logo />
              <Link to="/movies" className='header__link'>Фильмы</Link>
              <Link to="/saved-movies" className='header__link header__link_medium'>Сохраненные фильмы</Link>
            </nav>
            <nav className='header__nav-links'>
              <Link to="/profile" className='header__link'>Аккаунт
                <div className='header__nav-link-icon'></div>
              </Link>
            </nav>
          </>
        } />
      </Routes>
    </header>
  )
}

export default Header;
