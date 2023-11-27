import { BASE_URL } from "./constants";
import { fetchWithRefresh } from "./api-auth";
import { request } from "./utils";


// Получение данных об ингредиентах.
// Возвращает: Объект JSON с данными об ингредиентах.
export const getIngredientsData = (): Promise<any> => request("/ingredients");

// Отправка заказа на сервер.
// Параметры:
//   - data: Массив идентификаторов ингредиентов в заказе.
// Возвращает: Объект JSON с данными о созданном заказе.
export const postOrder = (data: string[]): Promise<any> => {
  return fetchWithRefresh(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken") as string,
    },
    body: JSON.stringify({ ingredients: data }),
  });
};

// Получение информации о заказе.
// Параметры:
//   - order: Идентификатор заказа.
// Возвращает: Объект JSON с данными о заказе.
export const getOrderInfoData = (order: string | undefined): Promise<any> =>
  request(`/orders/${order}`);