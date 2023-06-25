// компонент страницы с сохранёнными карточками фильмов
import './SavedMovies.css';
import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Filter from '../Filter/Filter';

const SavedMovies = ({ onError }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Filter setIsLoading={setIsLoading} isSavedMovies={true} sLoading={isLoading} onError={onError} />
    </>
  )
}

export default SavedMovies;
