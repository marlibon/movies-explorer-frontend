import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Section from '../Section/Section';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    }
    return (
        <Section>
            <h1 className='not-found__title'>404</h1>
            <p className='not-found__description'>Страница не найдена</p>
            <button onClick={handleClick} className='not-found__link'>Назад</button>
        </Section >
    )
}
export default NotFound
