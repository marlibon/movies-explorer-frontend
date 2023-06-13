// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством
import './MoviesCardList.css';
import Section from '../Section/Section';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';

const MoviesCardList = ({ films, isLoading, remainingFilms, viewStillFilms, handleClickDeleteButton }) => {
  // временная ручная установка прелоадера чтобы показать момент загрузки
  useEffect(() => {
    viewStillFilms && viewStillFilms()
  }, [])

  return (
    <Section theme="small" >
      {films.length ? (
        <ul className='movies-card-list'>
          {films.map((movie, index) => <MoviesCard movie={movie} key={index} handleClickDeleteButton={handleClickDeleteButton} />)}
        </ul>
      ) : !isLoading ? <h3>Список фильмов пуст</h3> : ''}

      {isLoading ? <Preloader /> : ""}
      {remainingFilms?.length ? <button className='movies-card-list__button' onClick={viewStillFilms}>Ещё</button> : ''}
    </Section>
  )
}

export default MoviesCardList;
