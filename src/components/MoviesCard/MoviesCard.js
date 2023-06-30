/* eslint-disable react-hooks/exhaustive-deps */
// компонент одной карточки фильма
import { useEffect, useState } from 'react';
import './MoviesCard.css';
import LikeButton from '../LikeButton/LikeButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import { url } from '../../utils/MoviesApi';
import Popup from '../Popup/Popup';

const MoviesCard = ({
  movie,
  handleClickDeleteButton,
  onDisLike,
  onLike,
  savedFilms,
  isSavedMovies
}) => {
  const [widthAndHeightFramePopupVideo, setWidthAndHeightFramePopupVideo] =
    useState({});
  const {
    _id,
    id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    liked,
    nameRU,
    nameEN
  } = movie;
  const [isLiked, setIsliked] = useState(liked ? true : false);
  const [isId, setIsId] = useState(null);
  const baseUrl = `${url.protocol}//${url.hostname}`;
  const linkImage =
    typeof movie.image === 'string' ? movie.image : baseUrl + image.url;
  const thumbnail = movie.thumbnail
    ? movie.thumbnail
    : baseUrl + image?.formats?.thumbnail?.url;
  const [popupOpened, setPopupOpened] = useState(false);
  function handleClickLikeButton () {
    isLiked
      ? onDisLike(isId, setIsliked)
      : onLike(
        {
          country,
          director,
          duration,
          year,
          description,
          trailerLink,
          nameRU,
          nameEN,
          thumbnail,
          movieId: id,
          image: linkImage
        },
        setIsliked
      );
  }

  function convertMinutesToHoursAndMinutes (minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (!hours) return `${remainingMinutes}м`;
    return `${hours}ч ${remainingMinutes}м`;
  }

  function calculateProportionVideoFrame () {
    const screenWidth = window.innerWidth;
    let width, height;
    const scale = 0.7;
    width = Math.round(screenWidth * scale);
    height = Math.round((9 * screenWidth * scale) / 16);
    setWidthAndHeightFramePopupVideo({ width, height });
  }

  function handleResize () {
    setTimeout(() => {
      calculateProportionVideoFrame();
    }, 500);
  }

  useEffect(() => {
    calculateProportionVideoFrame();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const likedFilm = savedFilms.length
      ? savedFilms.find((savedFilm) => savedFilm?.movieId === id)
      : false;
    setIsliked(!!likedFilm);
    setIsId(likedFilm?._id);
  }, [savedFilms]);

  return (
    <>
      <li className="movies-card">
        <img
          src={linkImage}
          alt={nameRU}
          className="movies-card__image"
          onClick={() => {
            setPopupOpened(true);
          }}
        />
        <div className="movies-card__column">
          <h4 className="movies-card__title">{nameRU}</h4>

          {isSavedMovies ? (
            <DeleteButton
              handleClickDeleteButton={() => onDisLike(isId || _id)}
            />
          ) : (
            <LikeButton
              isLiked={isLiked}
              handleClickLikeButton={handleClickLikeButton}
            />
          )}
        </div>
        <p className="movies-card__duration">
          {convertMinutesToHoursAndMinutes(duration)}
        </p>
      </li>
      {popupOpened && (
        <Popup isOpen={popupOpened} setPopupOpened={setPopupOpened}>
          <figure className="popup__fig">
            <iframe
              width={widthAndHeightFramePopupVideo.width}
              height={widthAndHeightFramePopupVideo.height}
              src={`https://www.youtube.com/embed/${trailerLink.split('v=')[1]
                }`}
              allowFullScreen
              title="YouTube video player"
            ></iframe>
          </figure>
        </Popup>
      )}
    </>
  );
};

export default MoviesCard;
