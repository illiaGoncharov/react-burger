const BASE_URL = "https://norma.nomoreparties.space/api/";

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
};

// Функция для проверки успешного ответа
const checkSuccess = (response) => {
  if (response && response.success) {
    return response;
  }
  return Promise.reject(`Ответ не success: ${response}`);
};

// Функция для отправки запросов
const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

// Обновление токена
export const refreshToken = async () => {
  try {
    const response = await request("auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });

    const { accessToken } = response;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Выполнение запроса с возможностью обновления токена
export const fetchWithRefresh = async (endpoint, options) => {
  try {
    const response = await fetch(endpoint, options);
    // return await checkResponse(response);
    return response;
  } catch (error) {
    console.log(error);
    if (error.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const response = await fetch(endpoint, options);
      return response;
    } else {
      return Promise.reject(error);
    }
  }
};

// Запрос списка ингредиентов
export const apiIngredients = () => {
  return request("ingredients", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  });
};

// Создание заказа
export const apiOrder = (ingredientsData) => {
  return request("orders", {
    method: "POST",
    body: JSON.stringify({
      ingredients: ingredientsData.map((el) => el._id),
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
  });
};

// Регистрация пользователя
export const apiUserReg = (email, password, name) => {
  return request("auth/register", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Вход пользователя
export const apiUserLogIn = (email, password) => {
  return request("auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Выход пользователя
export const apiUserLogOut = () => {
  return request("auth/logout", {
    method: "POST",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Получение информации о пользователе
export const apiGetUser = () => {
  return fetchWithRefresh(`${BASE_URL}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: localStorage.getItem("accessToken"),
    },
  });
};

// Запрос на сброс пароля
export const apiForgotPassword = (email) => {
  return request("password-reset", {
    method: "POST",
    headers: { "Content-Type": "application/json",
    email: email,
    },
  });
};

// Сброс пароля
export const apiResetPassword = (password, token) => {
  return request("password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      password: password,
      token: token,
    },
  });
};

// Обновление информации о пользователе
export const apiPostUser = (email, name) => {
  return fetchWithRefresh(`${BASE_URL}auth/user`, {
    method: "PATCH",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
      email: email,
      name: name,
    }),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: localStorage.getItem("accessToken"),
    },
  }).catch((error) => console.log(error));
};
