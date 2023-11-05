import { wsActionsCreater } from "../../utilities/utilities";

export const WS_PROFILE_ORDERS_CONNECTION_START = "WS_PROFILE_ORDERS_CONNECTION_START";
export const WS_PROFILE_ORDERS_CONNECTION_SUCCESS = "WS_PROFILE_ORDERS_CONNECTION_SUCCESS";
export const WS_PROFILE_ORDERS_CONNECTION_ERROR = "WS_PROFILE_ORDERS_CONNECTION_ERROR";
export const WS_PROFILE_ORDERS_CONNECTION_CLOSED = "WS_PROFILE_ORDERS_CONNECTION_CLOSED";
export const WS_PROFILE_ORDERS_GET_MESSAGE = "WS_PROFILE_ORDERS_GET_MESSAGE";

export const WS_PROFILE_ORDERS_CONNECTION_STOP = "WS_PROFILE_ORDERS_CONNECTION_STOP";

export const wsProfileOrdersConnectionStart = (url) => ({
  type: WS_PROFILE_ORDERS_CONNECTION_START,
  payload: url,
});

export const wsProfileOrdersConnectionSuccess = (event) => ({
  type: WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
  payload: event,
});

export const wsProfileOrdersConnectionError = (event) => ({
  type: WS_PROFILE_ORDERS_CONNECTION_ERROR,
  payload: event,
});

export const wsProfileOrdersConnectionClosed = (event) => ({
  type: WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  payload: event,
});

export const wsProfileOrdersConnectionMessage = (data) => ({
  type: WS_PROFILE_ORDERS_GET_MESSAGE,
  payload: data,
});

export const wsProfileOrdersConnectionStop = () => ({
  type: WS_PROFILE_ORDERS_CONNECTION_STOP,
});

export const wsProfileOrdersActions = wsActionsCreater(
  wsProfileOrdersConnectionStart,
  wsProfileOrdersConnectionSuccess,
  wsProfileOrdersConnectionMessage,
  wsProfileOrdersConnectionClosed,
  wsProfileOrdersConnectionError,
  wsProfileOrdersConnectionStop
);
