// компонент страницы с поиском по фильмам
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import Footer from '../Footer/Footer';
const Movies = () => {


  return (
    <>
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </>
  )
}

export default Movies;
