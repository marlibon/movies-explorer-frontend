// компонент страницы с поиском по фильмам
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
// import initialFilms from '../../utils/initialFilms.json';
import { getAllMovies } from '../../utils/MoviesApi';

const Movies = () => {
  const [initialFilms, setInitialFilms] = useState([]);
  const [remainingFilms, setRemainingFilms] = useState([]);
  const [films, setFilms] = useState(localStorage.getItem('films') || []);
  const qtyViewFilms = 5;
  const [isLoading, setIsLoading] = useState(true);
  const nameInput = 'movie-search';
  const nameCheckboxShortFilms = 'short-films';

  useEffect(() => {
    setFilms(initialFilms.slice(qtyViewFilms))
  }, [initialFilms])

  useEffect(() => {
    setRemainingFilms(initialFilms.slice(films.length))
  }, [films])

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchText = event.target[nameInput].value;
    const filterShortFilms = event.target[nameCheckboxShortFilms].checked;
    function filterMovies ({ allFilms, searchText = '', filterShortFilms }) {
      let filteredFilms = allFilms.filter((item) => item.nameRU ? item.nameRU.toLowerCase().includes(searchText.toLowerCase()) : false);
      if (!filterShortFilms) {
        filteredFilms = filteredFilms.filter((item) => item.duration > 40);
      }
      return filteredFilms;
    }

    getAllMovies()
      .catch((error) => console.log('ошибка на этапе загрузки списка всех фильмов с сервера beatfilm-movies', error))
      .then((allFilms) => {
        return filterMovies({ allFilms, searchText, filterShortFilms })
      })
      .then((data) => setInitialFilms(data))
      .catch((error) => console.log(error))

    // console.log(filterMovies({ allFilms, searchText, filterShortFilms }));
  }
  function viewStillFilms () {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setFilms([...films, ...remainingFilms.slice(0, 5)])
    }, 2000)
  }

  return (
    <>
      <SearchForm handleSubmit={handleSubmit} nameInput={nameInput} nameCheckboxShortFilms={nameCheckboxShortFilms} />
      <MoviesCardList films={films} isLoading={isLoading} remainingFilms={remainingFilms} viewStillFilms={viewStillFilms} />
      <Footer />
    </>
  )
}

export default Movies;
