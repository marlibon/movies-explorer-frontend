export const url = new URL('https://api.nomoreparties.co/beatfilm-movies');

export const getAllMovies = () => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
};
