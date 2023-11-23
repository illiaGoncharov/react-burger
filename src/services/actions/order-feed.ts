import {
  WS_ORDER_CONNECT,
  WS_ORDER_DISCONNECT,
  WS_ORDER_CONNECTING,
  WS_ORDER_OPEN,
  WS_ORDER_CLOSE,
  WS_ORDER_MESSAGE,
  WS_ORDER_ERROR,
} from "../constants";

import { TOrders } from "../../utils/types";

// Действие для подключения к WebSocket
export interface IWsOrderConnect {
  readonly type: typeof WS_ORDER_CONNECT;
  readonly payload: string;
}

// Действие для отключения
export interface IWsOrderDisconnect {
  readonly type: typeof WS_ORDER_DISCONNECT;
}

// Действие для сигнала о текущем соединении
export interface IWsOrderConnecting {
  readonly type: typeof WS_ORDER_CONNECTING;
}

// Действие для сигнала об открытом соединении
export interface IWsOrderOpen {
  readonly type: typeof WS_ORDER_OPEN;
}

// Действие для сигнала о закрытом
export interface IWsOrderClose {
  readonly type: typeof WS_ORDER_CLOSE;
}

// Действие для обработки полученного сообщения
export interface IWsOrderMessage {
  readonly type: typeof WS_ORDER_MESSAGE;
  readonly payload: TOrders;
}

// Действие для обработки ошибки
export interface IWsOrderError {
  readonly type: typeof WS_ORDER_ERROR;
  readonly payload: string;
}

export type TOrderFeedActions =
  | IWsOrderConnect
  | IWsOrderDisconnect
  | IWsOrderConnecting
  | IWsOrderOpen
  | IWsOrderClose
  | IWsOrderMessage
  | IWsOrderError;

export const wsOrderConnect = (url: string): IWsOrderConnect => ({
  type: WS_ORDER_CONNECT,
  payload: url,
});

export const wsOrderDisconnect = (): IWsOrderDisconnect => ({
  type: WS_ORDER_DISCONNECT,
});
