// компонент с информацией о студенте.
import Section from '../Section/Section';
import './AboutMe.css';
import imageFoto from '../../images/about-me-foto.jpg';
import { myBirthday } from '../../utils/constants';
import { Link } from 'react-router-dom';
import Portfolio from '../Portfolio/Portfolio';

const AboutMe = () => {
  function myAge(date) {
    if (new Date(date) === 'Invalid Date' || isNaN(new Date(date)))
      return 'проверьте настройки дня рождения';
    const ageDifMs = Date.now() - date.getTime();
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (age % 10 === 1 && age !== 11) {
      return age + ' год';
    } else if (age % 10 >= 2 && age % 10 <= 4 && (age < 10 || age > 20)) {
      return age + ' года';
    } else {
      return age + ' лет';
    }
  }
  return (
    <Section title="Студент" theme="aboutme" id="aboutme">
      <div className="about-me">
        <div className="about-me__column">
          <div className="about-me__info">
            <h3 className="about-me__title">Марат</h3>
            <h4 className="about-me__subtitle">
              Фронтенд-разработчик, {myAge(myBirthday)}
            </h4>
            <p className="about-me__description">
              Я родился и живу в г.Ишимбай, закончил УГНТУ . У меня есть жена и
              2 сына. Я люблю кодить, работать с деревом, отдыхать на природе.
              Веб-разработкой занимаюсь с 2011 года, но с того времени успел
              побывать и предпринимателем, и инженером-энергетиком, но сейчас я
              полностью ушел в программирование.
            </p>
            <Link className="about-me__link" to="#">
              Github
            </Link>
          </div>
          <img
            className="about-me__image"
            src={imageFoto}
            alt="мое фото - Марат Загриев"
          />
        </div>
        <Portfolio />
      </div>
    </Section>
  );
};

export default AboutMe;
