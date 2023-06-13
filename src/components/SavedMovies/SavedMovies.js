// компонент страницы с сохранёнными карточками фильмов
import './SavedMovies.css';
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import initialFilms from '../../utils/initialFilms.json';

const SavedMovies = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFilms(initialFilms.slice(0, 6));
    }, 2000)

  }, [])
  function handleClickDeleteButton (currentMovie) {
    setFilms(
      films.filter((film) => JSON.stringify(film) !== JSON.stringify(currentMovie))
    )
  }
  return (
    <>
      <SearchForm />
      <MoviesCardList films={films} isLoading={isLoading} handleClickDeleteButton={handleClickDeleteButton} />
      <Footer />
    </>
  )
}

export default SavedMovies;
