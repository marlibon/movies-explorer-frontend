/* eslint-disable react-hooks/exhaustive-deps */
// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством
import './MoviesCardList.css';
import Section from '../Section/Section';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useEffect } from 'react';

const MoviesCardList = ({
  films,
  savedFilms,
  isLoading,
  remainingFilms,
  viewStillFilms,
  handleClickDeleteButton,
  onLike,
  onDisLike,
  isSavedMovies
}) => {
  // временная ручная установка прелоадера чтобы показать момент загрузки
  useEffect(() => {
    viewStillFilms && viewStillFilms();
  }, []);

  return (
    <Section theme="movies">
      {films.length ? (
        <ul className="movies-card-list">
          {films.map((movie, index) => (
            <MoviesCard
              movie={movie}
              savedFilms={savedFilms}
              key={index}
              handleClickDeleteButton={handleClickDeleteButton}
              onDisLike={onDisLike}
              onLike={onLike}
              isSavedMovies={isSavedMovies}
            />
          ))}
        </ul>
      ) : !isLoading ? (
        <h3>Ничего не найдено</h3>
      ) : (
        ''
      )}

      {isLoading ? <Preloader /> : ''}
      {remainingFilms?.length ? (
        <button className="movies-card-list-btn" onClick={viewStillFilms}>
          Ещё
        </button>
      ) : (
        ''
      )}
    </Section>
  );
};

export default MoviesCardList;
