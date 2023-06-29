import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = ({ onLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onLoggedIn(false);
    localStorage.removeItem('token');
    // удаляю фильтры и фильмы, т.к. так можно увидеть настройки другого пользователя на этом же компьютере
    localStorage.removeItem('dataForm');
    localStorage.removeItem('savedFilms');
    localStorage.removeItem('filteredFilms');
    navigate('/', { replace: true });
  }, []);
  return <div>выходим...</div>;
};
export default SignOut;
