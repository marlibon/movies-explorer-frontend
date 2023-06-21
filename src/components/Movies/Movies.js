// компонент страницы с поиском по фильмам
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import { useState } from 'react';
import Footer from '../Footer/Footer';
import initialFilms from '../../utils/initialFilms.json';

const Movies = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const remainingFilms = initialFilms.slice(films.length);

  function viewStillFilms () {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setFilms([...films, ...remainingFilms.slice(0, 5)])
    }, 2000)
  }

  return (
    <>
      <SearchForm />
      <MoviesCardList films={films} isLoading={isLoading} remainingFilms={remainingFilms} viewStillFilms={viewStillFilms} />
      <Footer />
    </>
  )
}

export default Movies;
