// компонент, который отрисовывает шапку сайта на страницу
import { Link, Routes, Route } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Header.css';
import Navigation from '../Navigation/Navigation';

const Header = ({ menuOpened, handleMenuOpened }) => {
  return (
    <header className='header'>


      <Routes>
        {/* для главной */}
        <Route path="/" element={
          <>
            <Logo />
            <nav className='header__nav-links'>
              <Link to="/signup" className='header__link header__link_auth'>Регистрация</Link>
              <Link to="/signin" className='header__link header__link_auth header__link_type_btn'>Войти</Link>
            </nav>
          </>
        } />
        {/* для остальных страниц */}
        <Route path="*" element={
          <>
            <nav className='header__nav-links header__nav-links_hidden_tablet-mobile'>
              <Logo />
              <Link to="/movies" className='header__link'>Фильмы</Link>
              <Link to="/saved-movies" className='header__link header__link_medium'>Сохранённые фильмы</Link>
            </nav>
            <nav className='header__nav-links header__nav-links_hidden_tablet-mobile'>
              <Link to="/profile" className='header__link header__link_profile'>Аккаунт
                <div className='header__nav-link-icon'></div>
              </Link>
            </nav>
            <nav className='header__nav-links header__nav-links_hidden_pc'>
              <Logo />
              <button className={`header__btn-menu ${menuOpened ? 'header__btn-menu_close' : ''}`} onClick={() => handleMenuOpened(!menuOpened)}>
              </button>
            </nav>
            <Navigation menuOpened={menuOpened} onClose={() => handleMenuOpened(false)} />
          </>
        } />
      </Routes>
    </header>
  )
}

export default Header;
