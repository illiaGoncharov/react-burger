import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "./reducers";

import { socketMiddleware } from "./middleware/socket-middleware";

import {
  WS_ORDER_CLOSE,
  WS_ORDER_CONNECT,
  WS_ORDER_ERROR,
  WS_ORDER_OPEN,
  WS_ORDER_MESSAGE,
  WS_ORDER_DISCONNECT,
  WS_ORDER_CONNECTING,
} from "./constants";

import {
  WS_PROFILE_ORDERS_CLOSE,
  WS_PROFILE_ORDERS_CONNECT,
  WS_PROFILE_ORDERS_CONNECTING,
  WS_PROFILE_ORDERS_DISCONNECT,
  WS_PROFILE_ORDERS_ERROR,
  WS_PROFILE_ORDERS_MESSAGE,
  WS_PROFILE_ORDERS_OPEN,
} from "./constants";

// Задаем конфигурацию для middleware в разделе заказов профиля пользователя
const profileOrdersMiddleware = {
  wsConnect: WS_PROFILE_ORDERS_CONNECT,
  wsDisconnect: WS_PROFILE_ORDERS_DISCONNECT,
  wsConnecting: WS_PROFILE_ORDERS_CONNECTING,
  onOpen: WS_PROFILE_ORDERS_OPEN,
  onClose: WS_PROFILE_ORDERS_CLOSE,
  onError: WS_PROFILE_ORDERS_ERROR,
  onMessage: WS_PROFILE_ORDERS_MESSAGE,
};

// Задаем конфигурацию для middleware в разделе заказов
const feedMiddleware = {
  wsConnect: WS_ORDER_CONNECT,
  wsDisconnect: WS_ORDER_DISCONNECT,
  wsConnecting: WS_ORDER_CONNECTING,
  onOpen: WS_ORDER_OPEN,
  onClose: WS_ORDER_CLOSE,
  onMessage: WS_ORDER_MESSAGE,
  onError: WS_ORDER_ERROR,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      socketMiddleware(profileOrdersMiddleware),
      socketMiddleware(feedMiddleware),
    ),
  ),
);
