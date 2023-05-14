const api = 'https://norma.nomoreparties.space/api';

export const request = (endpoint, options) => fetch(`${api}/${endpoint}`, options).then(checkResponse);

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

