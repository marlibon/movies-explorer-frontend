import { getSavedMovie, createMovie, getDeleteMovie } from '../../utils/MainApi';
import { getAllMovies } from '../../utils/MoviesApi';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';


const Filter = ({ isLoading, setIsLoading, onError, isSavedMovies }) => {
    const [filteredFilms, setFilteredFilms] = useState([]); // отфильтрованные и готовые к показу фильмы
    const [films, setFilms] = useState([]); // фильмы, которые сейчас отображаются
    const [remainingFilms, setRemainingFilms] = useState([]); // оставшиеся после базового отображения фильмы (для кнопки еще)
    const [savedFilms, setSavedFilms] = useState([]); // фильмы где установлен лайк
    const nameInput = 'movie-search'; // название инпута
    const nameCheckboxShortFilms = 'short-films'; //название чекбокса
    const [dataForm, setDataForm] = useState({ [nameInput]: '', [nameCheckboxShortFilms]: true }) // данные полей инпута и чекбокса
    const [loadMoreCount, setLoadMoreCount] = useState(null); //  сколько карточек вывести при нажатии на кнопку Еще в текущей ширине экрана
    const [qtyViewCards, setQtyViewCards] = useState(null); //сколько карточек отображать в текущей ширине экрана

    // сохраняем в хранилище актуальные списки сохраненных и отфильтрованных фильмов
    useEffect(() => {
        savedFilms.length && localStorage.setItem('savedMovies', JSON.stringify(savedFilms))
        filteredFilms.length && localStorage.setItem('filteredFilms', JSON.stringify(filteredFilms))
    }
        , [savedFilms, filteredFilms])

    // для работы с хранилищем. при монтировании берем данные с хранилища
    useEffect(() => {
        const filteredFilms = localStorage.getItem('filteredFilms') ? JSON.parse(localStorage.getItem('filteredFilms')) : []
        const savedFilms = localStorage.getItem('savedMovies') ? JSON.parse(localStorage.getItem('savedMovies')) : []
        const films = filteredFilms.slice(0, qtyViewCards)
        const remainingFilms = filteredFilms.slice(films.length)
        const dataForm = JSON.parse(localStorage.getItem('dataForm')) || { [nameInput]: '', [nameCheckboxShortFilms]: true }
        setFilteredFilms(filteredFilms)
        setSavedFilms(savedFilms)
        setFilms(films)
        setRemainingFilms(remainingFilms)
        setDataForm(dataForm)
    }, [])

    // фукнция сохраняет фильм на сервере
    function handleLikeMovie (movie, setIsliked) {
        createMovie(movie)
            .then((movie) => {
                const newSavedFilms = [...savedFilms, movie];
                setSavedFilms(newSavedFilms);
                setIsliked(true)
            })
            .catch(onError)
    }
    // функция обращается на сервер и удаляет карточку со списка любимых фильмов
    function handleDislikeMovie (id, setIsliked) {
        getDeleteMovie(id)
            .then((movie) => {
                const newSavedFilms = savedFilms.filter((film) => film._id !== movie._id);
                setIsliked && setIsliked(false)
                setSavedFilms(newSavedFilms);
                if (isSavedMovies) {
                    // тут я удаляю из отображаемого списка фильм, которому поставили дизлайк (это нужно только для раздела сохраненные фильмы)
                    const newFilteredFilms = filteredFilms.filter((film) => film.id !== movie.movieId);
                    setFilteredFilms(newFilteredFilms);
                }
            })
            .catch(onError)
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
        setFilms(filteredFilms.slice(0, qtyViewCards))
    }, [filteredFilms])

    // если изменился стейт с отображаемыми фильмами, то надо изменить оставшиеся фильмы (покажутся по кнопке "ЕЩЕ")
    useEffect(() => {
        setRemainingFilms(filteredFilms.slice(films.length))
    }, [films])


    //функция фильтрации массива по переданным данным
    function filterMovies ({ allFilms, searchText = '', filterShortFilms }) {
        let filteredFilms = allFilms.filter((item) => item.nameRU ? item.nameRU.toLowerCase().includes(searchText.toLowerCase()) : false);
        if (!filterShortFilms) {
            filteredFilms = filteredFilms.filter((item) => item.duration > 40);
        }
        return filteredFilms;
    }

    // фукнция сабмита, загружает 2 базы (из 2 источников) и сразу фильтрует, сохраняет в стейт
    const handleSubmit = (event) => {
        event && event.preventDefault();
        setIsLoading(true);
        Promise.all([getSavedMovie(), getAllMovies()])
            .then(([savedMovies, allFilms]) => {
                if (isSavedMovies) {
                    // список id  сохранненых фильмов
                    const arrayIdSavedMovies = savedMovies.map(savedMovies => savedMovies.movieId)
                    // для раздела сохраненных фильмов оставляем только фильмы с id которых совпадают с айди сохраненных фильмов
                    let newallFilms = allFilms.filter((allfilm) => arrayIdSavedMovies.includes(allfilm.id))
                    // проходим по массиву и проставляем _id карточки нашего сервера
                    newallFilms = newallFilms.map((newallFilm) => {
                        const findedSavedMovie = savedMovies.find((savedMovie) => savedMovie.movieId === newallFilm.id)
                        newallFilm._id = findedSavedMovie?._id;
                        return newallFilm;
                    })
                    return [savedMovies, newallFilms]
                } else {
                    return [savedMovies, allFilms]
                }
            })
            .then(([savedMovies, allFilms]) => {
                setSavedFilms(savedMovies)
                localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
                return filterMovies({ allFilms, searchText: dataForm[nameInput], filterShortFilms: dataForm[nameCheckboxShortFilms] })
            })
            .then((filteredFilms) => {
                localStorage.setItem('filteredFilms', JSON.stringify(filteredFilms))
                localStorage.setItem('dataForm', JSON.stringify(dataForm))
                setFilteredFilms(filteredFilms)
            })
            .catch(onError)
            .finally(() => setIsLoading(false));
    }
    // функция для записи видимой части фильмов в стейт
    function viewStillFilms () {
        setFilms([...films, ...remainingFilms.slice(0, loadMoreCount)])
    }
    // отслеживание формы и запись в стейт
    function handleChange (event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setDataForm({ ...dataForm, [event.target.name]: value })
        setIsLoading(true);

    }
    // следит за изменением чекбокса "короткометражки" и заново запускает поиск
    useEffect(() => {
        handleSubmit()
    }, [dataForm[nameCheckboxShortFilms]])

    return (
        <>
            <SearchForm dataForm={dataForm} onSubmit={handleSubmit} onChange={handleChange} isLoading={isLoading} nameInput={nameInput} nameCheckboxShortFilms={nameCheckboxShortFilms} />
            <MoviesCardList films={films} savedFilms={savedFilms} isLoading={isLoading} remainingFilms={remainingFilms} viewStillFilms={viewStillFilms} onLike={handleLikeMovie} onDisLike={handleDislikeMovie} isSavedMovies={isSavedMovies} />
            <Footer />
        </>
    )
}
export default Filter
