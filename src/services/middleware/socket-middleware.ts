import { Middleware, MiddlewareAPI } from "redux";

import { getUser } from "../actions/auth";

import { TProfileOrdersActions } from "../actions/profile-orders";
import { TOrderFeedActions } from "../actions/order-feed";

import {
  TFeedMiddleware,
  TProfileOrdersMiddleware,
} from "../types/middleware-types";
import { AppDispatch, RootState } from "../types";

// Функция для создания middleware для WebSocket соединения
export const socketMiddleware = (
  wsActions: TFeedMiddleware | TProfileOrdersMiddleware,
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    // Инициализация переменных
    let socket: WebSocket | null = null;

    return (next) => (action: TProfileOrdersActions | TOrderFeedActions) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;

      // Обработка действия для установки соединения
      if (type === wsConnect) {
        // Создание WebSocket и отправка экшена о начале соединения
        socket = new WebSocket(action.payload);
        dispatch({ type: wsConnecting });
      }

      // Обработка событий WebSocket
      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError, payload: "Error" });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (parsedData.message === "Invalid or missing token") {
            dispatch(getUser());
          } else {
            dispatch({ type: onMessage, payload: parsedData });
          }
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };

        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      }

      // Передача действия дальше по цепочке middleware
      next(action);
    };
  };
};
