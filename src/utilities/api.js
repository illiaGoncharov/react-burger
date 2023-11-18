import { BASE_URL } from "./constants";
import {
  getAccessToken,
  getRefreshToken,
  setCookieFromResponce,
} from './cookies';

const defaultHeader = { 'Content-Type': 'application/json; charset=UTF-8' };

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject({ message: `Ошибка ${response.status}`, status: response.status });
};

// Функция для проверки успешного ответа
const checkSuccess = (response) => {
  if (response && response.success) {
    return response;
  }
  return Promise.reject({ message: `Ответ не success: ${response}`, response });
};

// Функция для отправки запросов
const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess).catch((error) => {
      console.error('Произошла ошибка при выполнении запроса:', error);
      return Promise.reject(error);
    });
};

// Запрос списка ингредиентов
export const apiGetIngredients = () => {
  return request("/ingredients", {
    method: "GET",
    headers: {
      ...defaultHeader
    }
  });
};

// Создание заказа
export const apiPlaceOrder = (ingredientsData) => {
  return request("/orders", {
    method: "POST",
    headers: {
      ...defaultHeader,
      Authorization: 'Bearer ' + getAccessToken(),
    },
    body: JSON.stringify({
      ingredients: ingredientsData,
    }),
  });
};

// Загрузка деталей заказа
export const apiGetOrderDetails = (orderNum) => {
  return request(`/orders/${orderNum}`, {
    method: "GET",
    headers: {
      ...defaultHeader,
      Authorization: 'Bearer ' + getAccessToken(),
    }
  });
}

// Регистрация пользователя
export const apiUserReg = (email, password, name) => {
  return request("/auth/register", {
    method: "POST",
    headers: {
      ...defaultHeader,
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
};

// Обновление информации о пользователе
export const apiUpdateUser = (email, name) => {
  return request("/auth/user", {
    method: "PATCH",
    headers: {
      ...defaultHeader,
      Authorization: 'Bearer ' + getAccessToken(),
    },
    body: JSON.stringify({
      email: email,
      name: name,
      token: getRefreshToken(),
    }),
  }).catch((error) => {
    console.error('Произошла ошибка при обновлении информации о пользователе:', error);
    return Promise.reject(error);
  });
};

// Вход пользователя
export const apiUserLogIn = (email, password) => {
  return request("/auth/login", {
    method: "POST",
    headers: {
      ...defaultHeader,
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((data) => {
    setCookieFromResponce(data);
    return Promise.resolve(data);
  }).catch((error) => {
    console.error('Произошла ошибка при входе пользователя:', error);
    return Promise.reject(error);
  });
};

// Выход пользователя
export const apiUserLogOut = () => {
  return request("/auth/logout", {
    method: "POST",
    headers: {
      ...defaultHeader,
    },
    body: JSON.stringify({
      token: getRefreshToken(),
    }),
  }).catch((error) => {
    console.error('Произошла ошибка при выходе пользователя:', error);
    return Promise.reject(error);
  });
};

// Получение информации о пользователе
export const apiGetUser = () => {
  return request("/auth/user", {
    method: "GET",
    headers: {
     ...defaultHeader,
      Authorization: 'Bearer ' + getAccessToken(),
    },
  });
};

// Обновление токена
export const refreshToken = () => {
  return request("/auth/user", {
    method: "POST",
    headers: {
      ...defaultHeader,
    },
    body: JSON.stringify({
      token: getRefreshToken(),
    }),
  });
}

// Получение данных пользователя с обновлением токена
export function apiGetUserWithRefresh() {
  return apiGetUser().catch((error) => {
    console.error('Произошла ошибка при получении данных пользователя:', error);
    return refreshToken()
      .then((data) => {
        setCookieFromResponce(data);
        return apiGetUser();
      })
      .catch((error) => {
        console.error('Произошла ошибка при обновлении токена и получении данных пользователя:', error);
        return Promise.reject(error);
      });
  });
}

// Запрос на сброс пароля
export const apiForgotPassword = (email) => {
  return request("password-reset", {
    method: "POST",
    headers: { 
      ...defaultHeader,
    },
    body: JSON.stringify({ 
      email: email
    }),
  });
};

// Сброс пароля
export const apiResetPassword = (password, token) => {
  return request("password-reset/reset", {
    method: "POST",
    headers: {
      ...defaultHeader
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  });
};