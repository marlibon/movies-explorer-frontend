import { getSavedMovie, createMovie, getDeleteMovie } from '../../utils/MainApi';
import { getAllMovies } from '../../utils/MoviesApi';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';


const Filter = ({ isLoading, setIsLoading, onError }) => {
    const [filteredFilms, setFilteredFilms] = useState([]); // отфильтрованные и готовые к показу фильмы
    const [films, setFilms] = useState([]); // фильмы, которые сейчас отображаются
    const [remainingFilms, setRemainingFilms] = useState([]); // оставшиеся после базового отображения фильмы (для кнопки еще)
    const [savedFilms, setSavedFilms] = useState([]); // фильмы где установлен лайк
    const nameInput = 'movie-search'; // название инпута
    const nameCheckboxShortFilms = 'short-films'; //название чекбокса
    const [dataForm, setDataForm] = useState(JSON.parse(localStorage.getItem('dataForm')) || { [nameInput]: '', [nameCheckboxShortFilms]: true }) // данные полей инпута и чекбокса
    const [changeStateCheckbox, setChangeStateCheckbox] = useState(localStorage.getItem('dataForm') ? JSON.parse(localStorage.getItem('dataForm'))[nameCheckboxShortFilms] : false) // если изменилось состояние чекбокса
    const [loadMoreCount, setLoadMoreCount] = useState(null); //  сколько карточек вывести при нажатии на кнопку Еще в текущей ширине экрана
    const [qtyViewCards, setQtyViewCards] = useState(null); //сколько карточек отображать в текущей ширине экрана

    // для работы с хранилищем. при монтировании берем данные с хранилища
    useEffect(() => {
        const filteredFilms = localStorage.getItem('filteredFilms') ? JSON.parse(localStorage.getItem('filteredFilms')) : []
        const savedFilms = localStorage.getItem('savedMovies') ? JSON.parse(localStorage.getItem('savedMovies')) : []
        const films = filteredFilms.slice(0, qtyViewCards)
        const remainingFilms = filteredFilms.slice(films.length)
        const dataForm = localStorage.getItem('dataForm') ? JSON.parse(localStorage.getItem('dataForm')) : { [nameInput]: '', [nameCheckboxShortFilms]: true }
        setFilteredFilms(filteredFilms)
        setSavedFilms(savedFilms)
        setFilms(films)
        setRemainingFilms(remainingFilms)
        setDataForm(dataForm)
    }, [])

    // функция сохраняет фильм на сервере
    function handleLikeMovie (movie, setIsliked) {
        document.body.style.cursor = 'wait';
        createMovie(movie)
            .then((movie) => {
                const newSavedFilms = [...savedFilms, movie];
                setSavedFilms(newSavedFilms);
                localStorage.setItem('savedMovies', JSON.stringify(newSavedFilms))
                setIsliked(true)
            })
            .catch(onError)
            .finally(() => document.body.style.cursor = 'default')
    }
    // функция обращается на сервер и удаляет карточку со списка любимых фильмов
    function handleDislikeMovie (id, setIsliked) {
        document.body.style.cursor = 'wait';
        getDeleteMovie(id)
            .then((movie) => {
                const newSavedFilms = savedFilms.filter((film) => film._id !== movie._id);
                setIsliked && setIsliked(false)
                setSavedFilms(newSavedFilms);
                localStorage.setItem('savedMovies', JSON.stringify(newSavedFilms))

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
        console.log(localStorage.getItem('token'));
        event && event.preventDefault();
        setIsLoading(true);
        Promise.all([getSavedMovie(), getAllMovies()])
            .then(([savedMovies, allFilms]) => {
                // проходим по массиву,сравниваем и проставляем _id + лайк
                const newallFilms = allFilms.map((newallFilm) => {
                    const findedSavedMovie = savedMovies.find((savedMovie) => savedMovie.movieId === newallFilm.id)
                    newallFilm._id = findedSavedMovie?._id;
                    newallFilm.liked = true
                    return newallFilm;
                })
                return [savedMovies, newallFilms]
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
        event.target.type === 'checkbox' && setChangeStateCheckbox(event.target.checked)
    }
    // следит за изменением чекбокса "короткометражки" и заново запускает поиск
    useEffect(() => {
        JSON.stringify(dataForm) !== localStorage.getItem('dataForm') && localStorage.getItem('filteredFilms') && handleSubmit()
    }, [changeStateCheckbox])

    return (
        <>
            <SearchForm dataForm={dataForm} onSubmit={handleSubmit} onChange={handleChange} isLoading={isLoading} nameInput={nameInput} nameCheckboxShortFilms={nameCheckboxShortFilms} />
            <MoviesCardList films={films} savedFilms={savedFilms} isLoading={isLoading} remainingFilms={remainingFilms} viewStillFilms={viewStillFilms} onLike={handleLikeMovie} onDisLike={handleDislikeMovie} />
            <Footer />
        </>
    )
}
export default Filter
