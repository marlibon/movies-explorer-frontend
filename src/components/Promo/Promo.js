// компонент с вёрсткой баннера страницы «О проекте».
import { Link } from 'react-router-dom';
import './Promo.css';

const Promo = () => {
  return (
    <section className='promo'>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <nav className='promo__nav-links'>
        <a className='promo__nav-link' href="#about-project">О проекте</a>
        <a className='promo__nav-link' href="#techs">Технологии</a>
        <a className='promo__nav-link' href="#aboutme">Студент</a>
      </nav>
    </section>
  )
}

export default Promo;
