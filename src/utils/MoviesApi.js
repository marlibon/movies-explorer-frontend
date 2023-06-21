const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const getAllMovies = () => {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
};
