import {
  WS_PROFILE_ORDERS_OPEN,
  WS_PROFILE_ORDERS_CLOSE,
  WS_PROFILE_ORDERS_CONNECT,
  WS_PROFILE_ORDERS_DISCONNECT,
  WS_PROFILE_ORDERS_CONNECTING,
  WS_PROFILE_ORDERS_MESSAGE,
  WS_PROFILE_ORDERS_ERROR,
} from "../constants";

export interface IWsProfileOrdersConnect {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECT;
  readonly payload: string;
}

export interface IWsProfileOrdersDisconnect {
  readonly type: typeof WS_PROFILE_ORDERS_DISCONNECT;
}

export interface IWsProfileOrdersConnecting {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTING;
}

export interface IWsProfileOrdersOpen {
  readonly type: typeof WS_PROFILE_ORDERS_OPEN;
}

export interface IWsProfileOrdersClose {
  readonly type: typeof WS_PROFILE_ORDERS_CLOSE;
}

export interface IWsProfileOrdersMessage {
  readonly type: typeof WS_PROFILE_ORDERS_MESSAGE;
  readonly payload: {
    success: false;
    orders: [];
    total: 0;
    totalToday: 0;
  };
}

export interface IWsProfileOrdersError {
  readonly type: typeof WS_PROFILE_ORDERS_ERROR;
  readonly payload: string;
}

export type TProfileOrdersActions =
  | IWsProfileOrdersConnect
  | IWsProfileOrdersDisconnect
  | IWsProfileOrdersConnecting
  | IWsProfileOrdersOpen
  | IWsProfileOrdersClose
  | IWsProfileOrdersMessage
  | IWsProfileOrdersError;

export const wsProfileOrdersConnect = (
  url: string,
): IWsProfileOrdersConnect => ({
  type: WS_PROFILE_ORDERS_CONNECT,
  payload: url,
});

export const wsProfileOrdersDisconnect = (): IWsProfileOrdersDisconnect => ({
  type: WS_PROFILE_ORDERS_DISCONNECT,
});
