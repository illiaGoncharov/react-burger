import { BASE_URL } from "./constants";

import { fetchWithRefresh } from "./api-auth";

import { request } from "./utils";

export const getIngredientsData = () => request("/ingredients");

export const postOrder = (data: string[]) => {
  return fetchWithRefresh(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken") as string,
    },
    body: JSON.stringify({ ingredients: data }),
  });
};

export const getOrderInfoData = (order: string | undefined) =>
  request(`/orders/${order}`);
