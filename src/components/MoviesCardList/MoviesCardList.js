// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством
import './MoviesCardList.css';
import Section from '../Section/Section';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import initialFilms from '../../utils/initialFilms.json';

const MoviesCardList = () => {
  const [films, setFilms] = useState([]);
  const remainingFilms = initialFilms.slice(films.length);
  const [isLoading, setIsLoading] = useState(true);


  // временная ручная установка прелоадера чтобы показать момент загрузки
  useEffect(() => {
    viewStillFilms()
  }, [])

  function viewStillFilms () {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setFilms([...films, ...remainingFilms.slice(0, 4)])
    }, 2000)

  }
  return (
    <Section theme="small" >
      {films.length ? (
        <ul className='movies-card-list'>
          {films.map(({ image, nameRU, duration }, index) => <MoviesCard image={image.url} title={nameRU} duration={duration} key={index} />)}
        </ul>
      ) : ''}
      {isLoading ? <Preloader /> : ""}
      {remainingFilms.length ? <button className='movies-card-list__button' onClick={viewStillFilms}>Ещё</button> : ''}
    </Section>
  )
}

export default MoviesCardList;
