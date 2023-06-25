import { getSavedMovie, getDeleteMovie } from '../../utils/MainApi';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';


const FilterSavedMovies = ({ isLoading, setIsLoading, onError, isSavedMovies }) => {
    const [filteredFilms, setFilteredFilms] = useState([]); // отфильтрованные и готовые к показу фильмы
    const [films, setFilms] = useState([]); // фильмы, которые сейчас отображаются
    const [remainingFilms, setRemainingFilms] = useState([]); // оставшиеся после базового отображения фильмы (для кнопки еще)
    const [savedFilms, setSavedFilms] = useState([]); // фильмы где установлен лайк
    const nameInput = 'movie-search'; // название инпута
    const nameCheckboxShortFilms = 'short-films'; //название чекбокса
    const [dataForm, setDataForm] = useState({ [nameInput]: '', [nameCheckboxShortFilms]: true }) // данные полей инпута и чекбокса
    const [loadMoreCount, setLoadMoreCount] = useState(null); //  сколько карточек вывести при нажатии на кнопку Еще в текущей ширине экрана
    const [qtyViewCards, setQtyViewCards] = useState(null); //сколько карточек отображать в текущей ширине экрана

    // загружаем сохраненные фильмы при загрузке страницы
    useEffect(() => {
        setIsLoading(true)
        getSavedMovie()
            .then((savedMovies) => {
                setFilms(savedMovies.reverse())
                setSavedFilms(savedMovies)
            })
            .catch(onError)
            .finally(() => setIsLoading(false));
    }, []);

    // функция обращается на сервер и удаляет карточку со списка любимых фильмов
    function handleDislikeMovie (id, setIsliked) {
        document.body.style.cursor = 'wait';
        getDeleteMovie(id)
            .then((movie) => {
                const newSavedFilms = savedFilms.filter((film) => film._id !== movie._id);
                setIsliked && setIsliked(false)
                setFilms(newSavedFilms)
                setSavedFilms(newSavedFilms);
            })
            .catch(onError)
            .finally(() => document.body.style.cursor = 'default')
    }

    //функция расчета количества отображаемых карточек
    function calculateCardsPerRow () {
        const screenWidth = window.innerWidth;
        let cardsPerRow, loadMoreCount;

        if (screenWidth >= 820) {
            cardsPerRow = 12;
            loadMoreCount = 4;
        } else if (screenWidth >= 530) {
            cardsPerRow = 8;
            loadMoreCount = 2;
        } else if (screenWidth >= 320) {
            cardsPerRow = 5;
            loadMoreCount = 2;
        }

        setQtyViewCards(cardsPerRow);
        setLoadMoreCount(loadMoreCount);
    }

    // при загрузке компонента запускаем функцию расчета ширины и отображаемых карточек
    useEffect(() => {
        calculateCardsPerRow();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // функция следит за изменением ширины страницы с задержкой
    function handleResize () {
        setTimeout(() => {
            calculateCardsPerRow();
        }, 500);
    }
    //если изменился стейт с отфильтрованными фильмами, надо показать часть сразу на странице
    useEffect(() => {
        setFilms(filteredFilms)
    }, [filteredFilms])

    //функция фильтрации массива по переданным данным
    function filterMovies ({ allFilms, searchText = '', filterShortFilms }) {
        let filteredFilms = allFilms.filter((item) => item.nameRU ? item.nameRU.toLowerCase().includes(searchText.toLowerCase()) : false);
        if (!filterShortFilms) {
            filteredFilms = filteredFilms.filter((item) => item.duration > 40);
        }
        return filteredFilms;
    }

    // фукнция сабмита сразу фильтрует, сохраняет в стейт
    const handleSubmit = (event) => {
        event && event.preventDefault();
        setIsLoading(true);
        const filteredSavedFilms = filterMovies({ allFilms: savedFilms, searchText: dataForm[nameInput], filterShortFilms: dataForm[nameCheckboxShortFilms] })
        setFilteredFilms(filteredSavedFilms)
    }

    // отслеживание формы и запись в стейт
    function handleChange (event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setDataForm({ ...dataForm, [event.target.name]: value })

    }
    // следит за изменением чекбокса "короткометражки" и заново запускает поиск
    useEffect(() => {
        handleSubmit()
    }, [dataForm[nameCheckboxShortFilms]])

    return (
        <>
            <SearchForm dataForm={dataForm} onSubmit={handleSubmit} onChange={handleChange} isLoading={isLoading} nameInput={nameInput} nameCheckboxShortFilms={nameCheckboxShortFilms} />
            <MoviesCardList films={films} savedFilms={savedFilms} isLoading={isLoading} onDisLike={handleDislikeMovie} isSavedMovies={isSavedMovies} />
            <Footer />
        </>
    )
}
export default FilterSavedMovies
