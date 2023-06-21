// компонент одной карточки фильма
import { useState } from 'react';
import './MoviesCard.css';
import LikeButton from '../LikeButton/LikeButton';
import DeleteButton from '../DeleteButton/DeleteButton';

const MoviesCard = ({ movie, handleClickDeleteButton }) => {
  const { image, nameRU, duration, liked } = movie;
  const [isLiked, setIsliked] = useState(liked)

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
      <img src={image.url} alt={nameRU} className='movies-card__image' />
      <div className='movies-card__column'>
        <h4 className='movies-card__title'>{nameRU}</h4>

        {handleClickDeleteButton
          ? <DeleteButton handleClickDeleteButton={() => handleClickDeleteButton(movie)} />
          : <LikeButton isLiked={isLiked} handleClickLikeButton={handleClickLikeButton} />}
      </div>
      <p className='movies-card__duration'>{convertMinutesToHoursAndMinutes(duration)}</p>
    </li>
  )
}

export default MoviesCard;
