import { wsActionsCreater } from "../../utils/utility";

export const WS_ORDERS_FEED_CONNECTION_START = "WS_ORDERS_FEED_CONNECTION_START";
export const WS_ORDERS_FEED_CONNECTION_SUCCESS = "WS_ORDERS_FEED_CONNECTION_SUCCESS";
export const WS_ORDERS_FEED_CONNECTION_ERROR = "WS_ORDERS_FEED_CONNECTION_ERROR";
export const WS_ORDERS_FEED_CONNECTION_CLOSED = "WS_ORDERS_FEED_CONNECTION_CLOSED";
export const WS_ORDERS_FEED_GET_MESSAGE = "WS_ORDERS_FEED_GET_MESSAGE";

export const WS_ORDERS_FEED_CONNECTION_STOP = "WS_ORDERS_FEED_CONNECTION_STOP";

export const wsOrdersFeedConnectionStart = url => ({
  type: WS_ORDERS_FEED_CONNECTION_START,
  payload: url,
});

export const wsOrdersFeedConnectionSuccess = (event) => ({
  type: WS_ORDERS_FEED_CONNECTION_SUCCESS,
  payload: event,
});

export const wsOrdersFeedConnectionError = (event) => ({
  type: WS_ORDERS_FEED_CONNECTION_ERROR,
  payload: event,
});

export const wsOrdersFeedConnectionClosed = (event) => ({
  type: WS_ORDERS_FEED_CONNECTION_CLOSED,
  payload: event,
});

export const wsOrdersFeedConnectionMessage = (data) => ({
  type: WS_ORDERS_FEED_GET_MESSAGE,
  payload: data,
});

export const wsOrdersFeedConnectionStop = () => ({
  type: WS_ORDERS_FEED_CONNECTION_STOP,
});

export const wsOrdersFeedActions = wsActionsCreater(
  wsOrdersFeedConnectionStart,
  wsOrdersFeedConnectionSuccess,
  wsOrdersFeedConnectionMessage,
  wsOrdersFeedConnectionClosed,
  wsOrdersFeedConnectionError,
  wsOrdersFeedConnectionStop
);
