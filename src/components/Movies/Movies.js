import { getAllMovies } from '../../utils/MoviesApi';
import './Movies.css';

import { useEffect, useState } from "react";
import Filter from '../Filter/Filter';

const Movies = ({ onError }) => {
  const [isLoading, setIsLoading] = useState(false);

  function loadFilms () {
    return getAllMovies()
      .then((data) => {
        if (data && data.length) {
          setIsLoading(false)
          return data;
        } else {
          throw new Error('Массив фильмов не получен с сервера');
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <Filter setIsLoading={setIsLoading} isLoading={isLoading} loadFilms={loadFilms} onError={onError} isSavedMovies={false} />
  )
}

export default Movies;
