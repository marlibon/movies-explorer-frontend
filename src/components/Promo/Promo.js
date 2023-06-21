// компонент с вёрсткой баннера страницы «О проекте».
import { Link } from 'react-router-dom';
import './Promo.css';

const Promo = () => {
  return (
    <section className='promo'>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <nav className='promo__nav-links'>
        <Link className='promo__nav-link' to="">О проекте</Link>
        <Link className='promo__nav-link' to="">Технологии</Link>
        <Link className='promo__nav-link' to="">Студент</Link>
      </nav>
    </section>
  )
}

export default Promo;
