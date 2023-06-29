// компонент страницы с сохранёнными карточками фильмов
import './SavedMovies.css';
import { useEffect, useState } from 'react';
import FilterSavedMovies from '../FilterSavedMovies/FilterSavedMovies';

const SavedMovies = ({
  isLoading,
  setIsLoading,
  savedFilms,
  setSavedFilms,
  loadSavedMoviesList,
  onDislikeMovie,
  onError
}) => {
  useEffect(() => {
    document.title = 'Сохраненные фильмы';
  }, []);

  return (
    <>
      <FilterSavedMovies
        savedFilms={savedFilms}
        setSavedFilms={setSavedFilms}
        loadSavedMoviesList={loadSavedMoviesList}
        isSavedMovies={true}
        onDislikeMovie={onDislikeMovie}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onError={onError}
      />
    </>
  );
};

export default SavedMovies;
