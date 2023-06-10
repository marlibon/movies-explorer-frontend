// презентационный компонент, который отрисовывает подвал
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {

  return (
    <footer className='footer'>
      <p className='footer__about-project'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <nav className='footer__navigation'>
        <p className='footer__copyright'>&#169; {new Date().getFullYear()}</p>
        <ul className='footer__nav-links'>
          <li>
            <Link className='footer__nav-link' to="#">Яндекс.Практикум</Link>
          </li>
          <li>
            <Link className='footer__nav-link' to="#">Github</Link>
          </li>
        </ul>
      </nav>

    </footer>
  )
}

export default Footer;
