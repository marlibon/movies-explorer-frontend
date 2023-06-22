import { getAllMovies } from '../../utils/MoviesApi';
import './Movies.css';

import { useEffect, useState } from "react";
import Filter from '../Filter/Filter';

const Movies = () => {
  const [initialFilms, setInitialFilms] = useState([]); // все фильмы с сервера
  const [isLoading, setIsLoading] = useState(false);

  function loadFilms () {
    return getAllMovies()
      .then((data) => {
        console.log("сервер");
        if (data && data.length) {
          setInitialFilms(data);
          setIsLoading(false)
          return data;
        } else {
          throw new Error('Массив фильмов не получен с сервера');
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <Filter setIsLoading={setIsLoading} isLoading={isLoading} initialFilms={initialFilms} loadFilms={loadFilms} />
  )
}

export default Movies;
