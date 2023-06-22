import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';


const Filter = ({ initialFilms, isLoading, setIsLoading, loadFilms }) => {
    const [remainingFilms, setRemainingFilms] = useState([]); // оставшиеся после базового отображения фильмы (для кнопки еще)
    const [filteredFilms, setFilteredFilms] = useState([]); // отфильтрованные и готовые к показу фильмы
    const [films, setFilms] = useState([]); // фильмы, которые сейчас отображаются
    const nameInput = 'movie-search';
    const nameCheckboxShortFilms = 'short-films';
    const [dataForm, setDataForm] = useState({ [nameInput]: '', [nameCheckboxShortFilms]: true }) // данные полей инпута и чекбокса
    const [qtyViewCards, setQtyViewCards] = useState(null);
    const [loadMoreCount, setLoadMoreCount] = useState(null);

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

    useEffect(() => {
        calculateCardsPerRow();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function handleResize () {
        setTimeout(() => {
            calculateCardsPerRow();
        }, 500);
    }
    useEffect(() => {
        setFilms(filteredFilms.slice(0, qtyViewCards))
    }, [filteredFilms])

    useEffect(() => {
        setRemainingFilms(filteredFilms.slice(films.length))
    }, [films])

    function filterMovies ({ allFilms, searchText = '', filterShortFilms }) {
        let filteredFilms = allFilms.filter((item) => item.nameRU ? item.nameRU.toLowerCase().includes(searchText.toLowerCase()) : false);
        if (!filterShortFilms) {
            filteredFilms = filteredFilms.filter((item) => item.duration > 40);
        }
        return filteredFilms;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        loadFilms()
            .then((allFilms) => filterMovies({ allFilms, searchText: dataForm[nameInput], filterShortFilms: dataForm[nameCheckboxShortFilms] }))
            .then((filteredMovies) => setFilteredFilms(filteredMovies))
            .catch((error) => console.log(error))
    }
    function viewStillFilms () {
        setFilms([...films, ...remainingFilms.slice(0, loadMoreCount)])

    }
    function handleChange (event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setDataForm({ ...dataForm, [event.target.name]: value })
        event.target.type === 'checkbox' && setFilteredFilms(filterMovies({ allFilms: initialFilms, searchText: dataForm[nameInput], filterShortFilms: event.target.checked }))
    }

    return (
        <>
            <SearchForm onSubmit={handleSubmit} onChange={handleChange} nameInput={nameInput} nameCheckboxShortFilms={nameCheckboxShortFilms} />
            <MoviesCardList films={films} isLoading={isLoading} remainingFilms={remainingFilms} viewStillFilms={viewStillFilms} />
            <Footer />
        </>
    )
}
export default Filter
