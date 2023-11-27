import { checkResponse, request } from "./utils";
import { BASE_URL } from "./constants";
import { TForm, TOptions } from "./types";

// Регистрация нового пользователя.
// Параметры:
//   - data: Данные пользователя для регистрации.
// Возвращает: Объект JSON с результатами регистрации.
export const registerUser = (data: TForm): Promise<any> =>
  request("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name,
    }),
  });


// Вход в профиль пользователя.
// Параметры:
//   - data: Данные пользователя для входа.
// Возвращает: Объект JSON с результатами входа.
export const loginProfile = (data: TForm): Promise<any> =>
  request("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

// Выход из профиля пользователя.
// Параметры:
//   - data: Токен пользователя.
// Возвращает: Объект JSON с результатами выхода.
export const logoutProfile = (data: string | null): Promise<any> =>
  request("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: data,
    }),
  });

// Обновление токена доступа.
// Возвращает: Объект JSON с обновленным токеном доступа.
export const refreshToken = (): Promise<any> =>
  request("/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });

// Выполнение запроса с обновлением токена доступа.
// Параметры:
//   - url: URL запроса.
//   - options: Параметры запроса.
// Возвращает: Объект JSON с результатами запроса.
export const fetchWithRefresh = async (url: string, options: TOptions): Promise<any> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

// Получение данных о пользователе.
// Возвращает: Объект JSON с данными пользователя.
export const getDataUser = (): Promise<any> => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: "GET",
    headers: {
      authorization: localStorage.getItem("accessToken") as string,
      "Content-Type": "application/json",
    },
  });
};

// Обновление данных пользователя.
// Параметры:
//   - data: Новые данные пользователя.
// Возвращает: Объект JSON с обновленными данными пользователя.
export const updateDataUser = (data: TForm): Promise<any> => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      authorization: localStorage.getItem("accessToken") as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  });
};

// Запрос на сброс пароля пользователя.
// Параметры:
//   - data: Данные для сброса пароля.
// Возвращает: Объект JSON с результатами запроса на сброс пароля.
export const forgotPasswordUser = (data: TForm): Promise<any> =>
  request("/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
    }),
  });

// Сброс пароля пользователя.
// Параметры:
//   - data: Данные для сброса пароля.
// Возвращает: Объект JSON с результатами сброса пароля.
export const resetPasswordUser = (data: TForm): Promise<any> =>
  request("/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: data.password,
      token: data.token,
    }),
  });
