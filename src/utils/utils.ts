import { BASE_URL } from "./constants";
import { TOptions } from "./types";

/**
 * Проверка ответа на успешность запроса.
 * @param {Response} res - Объект ответа от сервера.
 * @returns {Promise<any>} - Объект JSON с данными или отклоненной ошибкой.
 */
export const checkResponse = (res: Response): Promise<any> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

/**
 * Выполнение запроса к серверу.
 * @param {string} endpoint - Конечная точка API.
 * @param {TOptions} options - Опции запроса.
 * @returns {Promise<any>} - Объект JSON с данными.
 */
export const request = (endpoint: string, options?: TOptions): Promise<any> => {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
};

/**
 * Получение текстового статуса заказа на основе его кода.
 * @param {string} status - Код статуса заказа.
 * @returns {string} - Текстовое представление статуса заказа.
 */
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

/**
 * Получение временной зоны из даты.
 * @param {string} date - Строка с датой.
 * @returns {string} - Строка с временной зоной в формате GMT.
 */
export const getTimeZone = (date: string): string => {
  const offset = new Date(date).getTimezoneOffset();
  const prefix = offset < 0 ? "i-GMT+" : "i-GMT-";
  return `${prefix}${Math.abs(offset) / 60}`;
};
