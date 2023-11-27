import {
  GET_ORDER_REQUEST,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
  GET_ORDER_INFO_REQUEST,
  GET_ORDER_INFO_ERROR,
  GET_ORDER_INFO_SUCCESS,
  CLOSE_MODAL_ORDER_DETAILS,
  RESET_CONSTRUCTOR,
} from "../constants";

import { getOrderInfoData, postOrder } from "../../utils/api-burger";

import { AppDispatch } from "../types";
import { TOrder, TOrderNumber } from "../../utils/types";

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: TOrderNumber;
}

export interface IGetOrderError {
  readonly type: typeof GET_ORDER_ERROR;
}

export interface ICloseModalOrderDetails {
  readonly type: typeof CLOSE_MODAL_ORDER_DETAILS;
}

export interface IGetOrderInfoRequest {
  readonly type: typeof GET_ORDER_INFO_REQUEST;
}

export interface IGetOrderInfoSuccess {
  readonly type: typeof GET_ORDER_INFO_SUCCESS;
  readonly payload: TOrder;
}

export interface IGetOrderInfoError {
  readonly type: typeof GET_ORDER_INFO_ERROR;
}

// Объединение всех возможных типов действий для работы с заказами
export type TOrderActions =
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderError
  | ICloseModalOrderDetails
  | IGetOrderInfoRequest
  | IGetOrderInfoSuccess
  | IGetOrderInfoError;

// Функция для создания заказа
export const getOrderNumber = (data: string[]) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST,
    });

    try {
      const res = await postOrder(data);

      dispatch({
        type: GET_ORDER_SUCCESS,
        payload: res.order.number,
      });

      dispatch({
        type: RESET_CONSTRUCTOR,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: GET_ORDER_ERROR,
      });
    }
  };
};

// Функция для закрытия модального окна деталей заказа
export const closeModalOrderDetails = (): ICloseModalOrderDetails => {
  return {
    type: CLOSE_MODAL_ORDER_DETAILS,
  };
};

// Функция для получения информации о заказе
export const getOrderInfo = (order: string | undefined) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: GET_ORDER_INFO_REQUEST,
    });

    try {
      const res = await getOrderInfoData(order);

      dispatch({
        type: GET_ORDER_INFO_SUCCESS,
        payload: res.orders[0],
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: GET_ORDER_INFO_ERROR,
      });
    }
  };
};
