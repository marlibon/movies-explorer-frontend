// компонент одной карточки фильма
import { useState } from 'react';
import './MoviesCard.css';
import LikeButton from '../LikeButton/LikeButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import { url } from '../../utils/MoviesApi';
import Popup from '../Popup/Popup';

const MoviesCard = ({ movie, handleClickDeleteButton }) => {
  const { image, nameRU, duration, liked, trailerLink } = movie;
  const [isLiked, setIsliked] = useState(liked)
  const baseUrl = `${url.protocol}//${url.hostname}`;
  const [popupOpened, setPopupOpened] = useState(false)
  function handleClickLikeButton () {
    setIsliked(!isLiked)
  }

  function convertMinutesToHoursAndMinutes (minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (!hours) return `${remainingMinutes}м`;
    return `${hours}ч ${remainingMinutes}м`;
  }

  return (
    <>
      <li className='movies-card' onClick={() => { setPopupOpened(true) }}>
        <img src={baseUrl + image.url} alt={nameRU} className='movies-card__image' />
        <div className='movies-card__column'>
          <h4 className='movies-card__title'>{nameRU}</h4>

          {handleClickDeleteButton
            ? <DeleteButton handleClickDeleteButton={() => handleClickDeleteButton(movie)} />
            : <LikeButton isLiked={isLiked} handleClickLikeButton={handleClickLikeButton} />}
        </div>
        <p className='movies-card__duration'>{convertMinutesToHoursAndMinutes(duration)}</p>
      </li>
      {popupOpened && <Popup isOpen={popupOpened} setPopupOpened={setPopupOpened}>
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/rRw_R46sYE8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
        <iframe width={window.innerWidth * 0.7} height={9 * window.innerWidth * 0.7 / 16} src={`https://www.youtube.com/embed/${trailerLink.split("v=")[1]}`} frameborder="0" allowfullscreen title="YouTube video player"></iframe>
      </Popup>}
    </>
  )
}

export default MoviesCard;
