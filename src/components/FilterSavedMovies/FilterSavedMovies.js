import { calculateCardsPerRow, filterMovies } from '../../utils/utils';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';

const FilterSavedMovies = ({
  savedFilms,
  setSavedFilms,
  isLoading,
  setIsLoading,
  loadSavedMoviesList,
  onDislikeMovie,
  isSavedMovies,
  onError
}) => {
  const [filteredFilms, setFilteredFilms] = useState([]); // отфильтрованные и готовые к показу фильмы
  const [films, setFilms] = useState([]); // фильмы, которые сейчас отображаются
  const nameInput = 'movie-search'; // название инпута
  const nameCheckboxShortFilms = 'short-films'; //название чекбокса
  const [dataForm, setDataForm] = useState({
    [nameInput]: '',
    [nameCheckboxShortFilms]: false
  }); // данные полей инпута и чекбокса
  const [loadMoreCount, setLoadMoreCount] = useState(null); //  сколько карточек вывести при нажатии на кнопку Еще в текущей ширине экрана
  const [qtyViewCards, setQtyViewCards] = useState(null); //сколько карточек отображать в текущей ширине экрана

  // при загрузке компонента запускаем функцию расчета ширины и отображаемых карточек
  useEffect(() => {
    const { cardsPerRow, loadMoreCount } = calculateCardsPerRow();
    setQtyViewCards(cardsPerRow);
    setLoadMoreCount(loadMoreCount);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {}, []);

  // функция следит за изменением ширины страницы с задержкой
  function handleResize() {
    setTimeout(() => {
      calculateCardsPerRow();
    }, 500);
  }
  //если изменился стейт с отфильтрованными фильмами, надо показать часть сразу на странице
  useEffect(() => {
    setFilms(filteredFilms);
  }, [filteredFilms]);

  // фукнция сабмита сразу фильтрует, сохраняет в стейт
  const handleSubmit = (event) => {
    event && event.preventDefault();
    const savedFilmsInLS = localStorage.getItem('savedFilms');
    if (savedFilmsInLS) {
      const savedFilms = JSON.parse(savedFilmsInLS);
      setSavedFilms(savedFilms);
      const filteredFilms = filterMovies({
        initialFilms: savedFilms,
        searchText: dataForm[nameInput],
        filterShortFilms: dataForm[nameCheckboxShortFilms]
      });
      setFilteredFilms(filteredFilms);
    } else {
      loadSavedMoviesList()
        .then((savedFilms) => {
          localStorage.setItem('savedFilms', JSON.stringify(savedFilms));
          const filteredFilms = filterMovies({
            initialFilms: savedFilms,
            searchText: dataForm[nameInput],
            filterShortFilms: dataForm[nameCheckboxShortFilms]
          });
          setFilteredFilms(filteredFilms);
        })
        .catch(onError)
        .finally(() => setIsLoading(false));
    }
  };

  // отслеживание формы и запись в стейт
  function handleChange(event) {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setDataForm({ ...dataForm, [event.target.name]: value });
  }
  // следит за изменением чекбокса "короткометражки" и заново запускает поиск
  useEffect(() => {
    handleSubmit();
  }, [dataForm[nameCheckboxShortFilms]]);

  return (
    <>
      <SearchForm
        dataForm={dataForm}
        onSubmit={handleSubmit}
        onChange={handleChange}
        isLoading={isLoading}
        nameInput={nameInput}
        nameCheckboxShortFilms={nameCheckboxShortFilms}
      />
      <MoviesCardList
        films={films}
        savedFilms={savedFilms}
        isLoading={isLoading}
        onDisLike={onDislikeMovie}
        isSavedMovies={isSavedMovies}
      />
      <Footer />
    </>
  );
};
export default FilterSavedMovies;
