// компонент страницы с сохранёнными карточками фильмов
import './SavedMovies.css';
import { useEffect, useState } from "react";
import FilterSavedMovies from '../FilterSavedMovies/FilterSavedMovies';

const SavedMovies = ({ onError }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Сохраненные фильмы';
  }, []);

  return (
    <>
      <FilterSavedMovies setIsLoading={setIsLoading} isSavedMovies={true} isLoading={isLoading} onError={onError} />
    </>
  )
}

export default SavedMovies;
