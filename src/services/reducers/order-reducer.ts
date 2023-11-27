import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  CLOSE_MODAL_ORDER_DETAILS,
  GET_ORDER_INFO_REQUEST,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_ERROR,
} from "../constants";

import { TOrderActions } from "../actions/order";
import { TOrder, TOrderNumber } from "../../utils/types";

// Тип для состояния в разделе заказов
type TOrderListState = {
  orderNumber: TOrderNumber | null;
  orderRequest: boolean;
  orderError: boolean;
  orderData: TOrder;
  getOrderDataRequest: boolean;
  getOrderDataError: boolean;
};

// Исходное состояние для раздела заказов
const orderInitialState: TOrderListState = {
  orderNumber: null,
  orderRequest: false,
  orderError: false,
  orderData: {
    createdAt: "",
    ingredients: [],
    name: "",
    owner: "",
    status: "",
    updatedAt: "",
    number: 0,
    _id: "",
    __v: 0,
  },
  getOrderDataRequest: false,
  getOrderDataError: false,
};

// Редуктор для раздела заказов
export const orderReducer = (
  state = orderInitialState,
  action: TOrderActions,
): TOrderListState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderError: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload,
        orderRequest: false,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        orderRequest: false,
        orderError: true,
      };
    }
    case CLOSE_MODAL_ORDER_DETAILS: {
      return {
        ...state,
        orderNumber: null,
      };
    }
    case GET_ORDER_INFO_REQUEST: {
      return {
        ...state,
        getOrderDataRequest: true,
      };
    }
    case GET_ORDER_INFO_SUCCESS: {
      return {
        ...state,
        getOrderDataError: false,
        getOrderDataRequest: false,
        orderData: action.payload,
      };
    }
    case GET_ORDER_INFO_ERROR: {
      return {
        ...state,
        getOrderDataRequest: false,
        getOrderDataError: true,
      };
    }
    default: {
      return state;
    }
  }
};
