import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import { calculateCardsPerRow, filterMovies } from '../../utils/utils';

/**
 * порядок действий
 * изначальное положение чекбокса - выкл
 * сделать юзэффект при первом запуске, внутри котрого будет проверка на наличие в локалстораж initialMovies, если есть, берем его оттуда, если  нет загружаем через функцию которую прокидываем с app
 * 3 стейта - initial, filtered и films
 */
const Filter = ({
  initialFilms,
  setInitialFilms,
  savedFilms,
  setSavedFilms,
  loadAllMoviesList,
  onError,
  isLoading,
  onDislikeMovie,
  onLikeMovie
}) => {
  const [filteredFilms, setFilteredFilms] = useState([]); // отфильтрованные и готовые к показу фильмы
  const [films, setFilms] = useState([]); // фильмы, которые сейчас отображаются
  const [remainingFilms, setRemainingFilms] = useState([]); // оставшиеся после базового отображения фильмы (для кнопки еще)
  const nameInput = 'movie-search'; // название инпута
  const nameCheckboxShortFilms = 'short-films'; //название чекбокса
  const [dataForm, setDataForm] = useState(
    JSON.parse(localStorage.getItem('dataForm')) || {
      [nameInput]: '',
      [nameCheckboxShortFilms]: false
    }
  ); // данные полей инпута и чекбокса
  const [changeStateCheckbox, setChangeStateCheckbox] = useState(
    localStorage.getItem('dataForm')
      ? JSON.parse(localStorage.getItem('dataForm'))[nameCheckboxShortFilms]
      : false
  ); // если изменилось состояние чекбокса
  const [loadMoreCount, setLoadMoreCount] = useState(null); //  сколько карточек вывести при нажатии на кнопку Еще в текущей ширине экрана
  const [qtyViewCards, setQtyViewCards] = useState(null); //сколько карточек отображать в текущей ширине экрана

  // для работы с хранилищем. при монтировании берем данные с хранилища
  useEffect(() => {
    const filteredFilms = localStorage.getItem('filteredFilms')
      ? JSON.parse(localStorage.getItem('filteredFilms'))
      : [];
    const films = filteredFilms.slice(0, qtyViewCards);
    const remainingFilms = filteredFilms.slice(films.length);
    const dataForm = localStorage.getItem('dataForm')
      ? JSON.parse(localStorage.getItem('dataForm'))
      : { [nameInput]: '', [nameCheckboxShortFilms]: false };
    setFilteredFilms(filteredFilms);
    setFilms(films);
    setRemainingFilms(remainingFilms);
    setDataForm(dataForm);
  }, []);

  // при загрузке компонента запускаем функцию расчета ширины и отображаемых карточек
  useEffect(() => {
    const { cardsPerRow, loadMoreCount } = calculateCardsPerRow();
    setQtyViewCards(cardsPerRow);
    setLoadMoreCount(loadMoreCount);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // функция следит за изменением ширины страницы с задержкой
  function handleResize () {
    setTimeout(() => {
      const { cardsPerRow, loadMoreCount } = calculateCardsPerRow();
      setQtyViewCards(cardsPerRow);
      setLoadMoreCount(loadMoreCount);
    }, 500);
  }

  //если изменился стейт с отфильтрованными фильмами, надо показать часть сразу на странице
  useEffect(() => {
    setFilms(filteredFilms.slice(0, qtyViewCards));
  }, [filteredFilms]);

  // если изменился стейт с отображаемыми фильмами, то надо изменить оставшиеся фильмы (покажутся по кнопке "ЕЩЕ")
  useEffect(() => {
    setRemainingFilms(filteredFilms.slice(films.length));
  }, [films]);

  // фукнция сабмита фильтрует, сохраняет в стейт
  const handleSubmit = (event) => {
    event && event.preventDefault();
    const initialFilmsInLS = localStorage.getItem('initialFilms');
    const savedFilmsInLS = localStorage.getItem('savedFilms');
    if (initialFilmsInLS && savedFilmsInLS) {
      const initialFilms = JSON.parse(initialFilmsInLS);
      const savedFilms = JSON.parse(savedFilmsInLS);
      setInitialFilms(initialFilms);
      setSavedFilms(savedFilms);
      const filteredFilms = filterMovies({
        initialFilms,
        searchText: dataForm[nameInput],
        filterShortFilms: dataForm[nameCheckboxShortFilms]
      });
      setFilteredFilms(filteredFilms);
      localStorage.setItem('filteredFilms', JSON.stringify(filteredFilms));
      localStorage.setItem('dataForm', JSON.stringify(dataForm));
    } else {
      loadAllMoviesList()
        .then(({ savedFilms, newallFilms }) => {
          localStorage.setItem('savedFilms', JSON.stringify(savedFilms));
          localStorage.setItem('initialFilms', JSON.stringify(newallFilms));
          const filteredFilms = filterMovies({
            initialFilms: newallFilms,
            searchText: dataForm[nameInput],
            filterShortFilms: dataForm[nameCheckboxShortFilms]
          });
          setFilteredFilms(filteredFilms);
          localStorage.setItem('filteredFilms', JSON.stringify(filteredFilms));
          localStorage.setItem('dataForm', JSON.stringify(dataForm));
        })
        .catch(onError);
    }
  };

  // функция для записи видимой части фильмов в стейт
  function viewStillFilms () {
    setFilms([...films, ...remainingFilms.slice(0, loadMoreCount)]);
  }
  // отслеживание формы и запись в стейт
  function handleChange (event) {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setDataForm({ ...dataForm, [event.target.name]: value });
    event.target.type === 'checkbox' &&
      setChangeStateCheckbox(event.target.checked);
  }

  // следит за изменением чекбокса "короткометражки" и заново запускает поиск
  useEffect(() => {
    JSON.stringify(dataForm) !== localStorage.getItem('dataForm') &&
      localStorage.getItem('filteredFilms') &&
      handleSubmit();
  }, [changeStateCheckbox]);

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
        remainingFilms={remainingFilms}
        viewStillFilms={viewStillFilms}
        onLike={onLikeMovie}
        onDisLike={onDislikeMovie}
      />
      <Footer />
    </>
  );
};
export default Filter;
