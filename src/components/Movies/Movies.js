import { getAllMovies } from '../../utils/MoviesApi';
import './Movies.css';

import { useEffect, useState } from 'react';
import Filter from '../Filter/Filter';

const Movies = ({
  initialFilms,
  setInitialFilms,
  loadAllMoviesList,
  savedFilms,
  setSavedFilms,
  onError,
  isLoading,
  onLikeMovie,
  onDislikeMovie
}) => {
  useEffect(() => {
    document.title = 'Фильмы';
  }, []);

  return (
    <Filter
      initialFilms={initialFilms}
      setInitialFilms={setInitialFilms}
      savedFilms={savedFilms}
      setSavedFilms={setSavedFilms}
      loadAllMoviesList={loadAllMoviesList}
      onError={onError}
      isLoading={isLoading}
      onLikeMovie={onLikeMovie}
      onDislikeMovie={onDislikeMovie}
      isSavedMovies={false}
    />
  );
};

export default Movies;
