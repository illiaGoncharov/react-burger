import {
  WS_PROFILE_ORDERS_CLOSE,
  WS_PROFILE_ORDERS_ERROR,
  WS_PROFILE_ORDERS_MESSAGE,
  WS_PROFILE_ORDERS_OPEN,
} from "../constants";

import { TProfileOrdersActions } from "../actions/profile-orders";
import { TOrders } from "../../utils/types";

// Тип для состояния в разделе заказов профиля пользователя
type TProfileOrdersListState = {
  status: boolean;
  ordersData: TOrders;
  connectingError: string;
};

// Исходное состояние для раздела заказов профиля пользователя
const initialState: TProfileOrdersListState = {
  status: false,
  ordersData: {
    success: true,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  connectingError: "",
};

// Редуктор для раздела заказов профиля пользователя
export const profileOrdersReducer = (
  state = initialState,
  action: TProfileOrdersActions,
): TProfileOrdersListState => {
  switch (action.type) {
    case WS_PROFILE_ORDERS_OPEN:
      return {
        ...state,
        status: true,
        connectingError: "",
      };
    case WS_PROFILE_ORDERS_CLOSE:
      return {
        ...state,
        status: false,
      };
    case WS_PROFILE_ORDERS_ERROR:
      return {
        ...state,
        connectingError: action.payload,
      };
    case WS_PROFILE_ORDERS_MESSAGE:
      return {
        ...state,
        ordersData: action.payload,
      };
    default:
      return state;
  }
};
