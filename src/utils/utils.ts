import { BASE_URL } from "./constants";
import { TOptions } from "./types";

// Проверка ответа на успешность запроса.
// Возвращает: Объект JSON с данными или отклоненную ошибку.
export const checkResponse = (res: Response): Promise<any> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// Выполнение запроса к серверу.
// Параметры:
//   - endpoint: Конечная точка API.
//   - options: Опции запроса.
// Возвращает: Объект JSON с данными.
export const request = (endpoint: string, options?: TOptions): Promise<any> => {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
};

// Получение текстового статуса заказа на основе его кода.
// Параметры:
//   - status: Код статуса заказа.
// Возвращает: Текстовое представление статуса заказа.
export const getStatus = (status: string): string => {
  switch (status) {
    case "done":
      return "Выполнен";
    case "created":
      return "Создан";
    case "pending":
      return "Готовится";
    default:
      return "Отменен";
  }
};

// Получение временной зоны из даты.
// Параметры:
//   - date: Строка с датой.
// Возвращает: Строка с временной зоной в формате GMT.
export const getTimeZone = (date: string): string => {
  const offset = new Date(date).getTimezoneOffset();
  const prefix = offset < 0 ? "i-GMT+" : "i-GMT-";
  return `${prefix}${Math.abs(offset) / 60}`;
};
