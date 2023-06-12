// компонент страницы с поиском по фильмам
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import Footer from '../Footer/Footer';
const Movies = () => {
  const [isLoading, setIsLoading] = useState(true);

  // временная ручная установка прелоадера чтобы показать момент загрузки
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  })
  return (
    <>
      <section className='movies' >
        <SearchForm />
        {isLoading ? <Preloader /> : <MoviesCardList />}
      </section>
      <Footer />
    </>
  )
}

export default Movies;
