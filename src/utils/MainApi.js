/**# возвращает информацию о пользователе (email и имя)
GET /users/me

# обновляет информацию о пользователе (email и имя)
PATCH /users/me

# возвращает все сохранённые текущим  пользователем фильмы
GET /movies

# создаёт фильм с переданными в теле
# country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
POST /movies

# удаляет сохранённый фильм по id
DELETE /movies/_id */
export const BASE_URL = 'https://api.marlibon.nomoredomains.rocks';
// export const BASE_URL = 'http://localhost:3000';

const token = localStorage.getItem('token')
const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token || localStorage.getItem('token')}`
}
export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers,
        credentials: 'include'
    })
        .then((res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
};

export const register = (email, password, name) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
    })
        .then((res => res.ok || res.status === 400 || res.status === 409 ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))

};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        // credentials: 'include',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res => res.ok || res.status === 401 ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
};
export const editProfile = ({ email, name }) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ email, name })
    })
        .then((res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
};
export const createMovie = (movie) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers,
        body: JSON.stringify(movie)
    })
        .then((res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
};
export const getSavedMovie = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers,
    })
        .then((res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
};
export const getDeleteMovie = (id) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
        method: 'DELETE',
        headers,
    })
        .then((res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
};
