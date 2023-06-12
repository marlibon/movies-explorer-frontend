// компонент одной карточки фильма
import { useState } from 'react';
import './MoviesCard.css';

const MoviesCard = ({ image, title, duration }) => {
  const [isLiked, setIsliked] = useState(Math.random() < 0.5)
  function handleClickLikeButton () {
    setIsliked(!isLiked)
  }
  function convertMinutesToHoursAndMinutes (minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}ч ${remainingMinutes}м`;
  }

  return (
    <li className='movies-card'>
      <img src={image} alt={title} className='movies-card__image' />
      <div className='movies-card__column'>
        <h4 className='movies-card__title'>{title}</h4>
        <button
          href='#'
          className={`movies-card__like${isLiked ? ' movies-card__like_active' : ''}`}
          onClick={handleClickLikeButton}
          title={`${isLiked ? 'Удалить из избранного' : 'Добавить в избранное'}`}
        >&#10084;</button>
      </div>
      <p className='movies-card__duration'>{convertMinutesToHoursAndMinutes(duration)}</p>
    </li>
  )
}

export default MoviesCard;
