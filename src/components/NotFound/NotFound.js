import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__description">Страница не найдена</p>
      <button onClick={handleClick} className="not-found__link">
        Назад
      </button>
    </section>
  );
};
export default NotFound;
