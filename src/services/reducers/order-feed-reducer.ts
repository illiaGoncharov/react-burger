import {
  WS_ORDER_OPEN,
  WS_ORDER_MESSAGE,
  WS_ORDER_CLOSE,
  WS_ORDER_ERROR,
} from "../constants";

import { TOrderFeedActions } from "../actions/order-feed";
import { TOrders } from "../../utils/types";

// Тип для состояния в разделе заказов
type TOrderFeedState = {
  wsConnected: boolean;
  orders: TOrders;
  error: string;
};

// Исходное состояние для раздела заказов
const initialState: TOrderFeedState = {
  wsConnected: false,
  orders: {
    success: true,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  error: "",
};

// Редуктор для раздела заказов
export const feedOrdersReducer = (
  state = initialState,
  action: TOrderFeedActions,
): TOrderFeedState => {
  switch (action.type) {
    case WS_ORDER_OPEN:
      return {
        ...state,
        wsConnected: true,
        error: "",
      };
    case WS_ORDER_CLOSE:
      return {
        ...state,
        wsConnected: false,
        error: "",
      };
    case WS_ORDER_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    case WS_ORDER_MESSAGE:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};
