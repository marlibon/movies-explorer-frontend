import {
  MAX_DURATION_SHORT_FILMS,
  SCREEN_WIDTH_MOBILE,
  SCREEN_WIDTH_PC,
  SCREEN_WIDTH_TABLET
} from './constants';

//функция фильтрации массива по переданным данным
export function filterMovies ({
  initialFilms,
  searchText = '',
  filterShortFilms
}) {
  let filteredFilms = initialFilms.filter((item) => {
    if (filterShortFilms) {
      return item.duration <= MAX_DURATION_SHORT_FILMS;
    } else {
      return true;
    }
  });
  filteredFilms = filteredFilms.filter((item) =>
    item.nameRU
      ? item.nameRU.toLowerCase().includes(searchText.toLowerCase())
      : false
  );
  return filteredFilms;
}

//функция расчета количества отображаемых карточек
export function calculateCardsPerRow () {
  const screenWidth = window.innerWidth;
  let cardsPerRow, loadMoreCount;

  if (screenWidth >= SCREEN_WIDTH_PC) {
    cardsPerRow = 12;
    loadMoreCount = 4;
  } else if (screenWidth >= SCREEN_WIDTH_TABLET) {
    cardsPerRow = 8;
    loadMoreCount = 2;
  } else if (screenWidth >= SCREEN_WIDTH_MOBILE) {
    cardsPerRow = 5;
    loadMoreCount = 2;
  }
  return { cardsPerRow, loadMoreCount };
}
