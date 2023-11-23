// Экшены для пользовательской авторизации и аутентификации
export const GET_USER_ERROR: "GET_USER_ERROR" = "GET_USER_ERROR";
export const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";
export const SET_USER: "SET_USER" = "SET_USER";
export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_ERROR: "LOGIN_ERROR" = "LOGIN_ERROR";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_ERROR: "LOGOUT_ERROR" = "LOGOUT_ERROR";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" =
  "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_ERROR: "FORGOT_PASSWORD_ERROR" =
  "FORGOT_PASSWORD_ERROR";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" =
  "FORGOT_PASSWORD_SUCCESS";
export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" =
  "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_ERROR: "RESET_PASSWORD_ERROR" =
  "RESET_PASSWORD_ERROR";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" =
  "RESET_PASSWORD_SUCCESS";
export const UPDATE_DATA_USER_REQUEST: "UPDATE_DATA_USER_REQUEST" =
  "UPDATE_DATA_USER_REQUEST";
export const UPDATE_DATA_USER_ERROR: "UPDATE_DATA_USER_ERROR" =
  "UPDATE_DATA_USER_ERROR";
export const UPDATE_DATA_USER_SUCCESS: "UPDATE_DATA_USER_SUCCESS" =
  "UPDATE_DATA_USER_SUCCESS";
export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_ERROR: "REGISTER_ERROR" = "REGISTER_ERROR";
export const REGISTER_SUCCESS: "REGISTER_SUCCESS" = "REGISTER_SUCCESS";

// Экшены для управления конструктором бургера
export const ADD_INGREDIENT_CONSTRUCTOR: "ADD_INGREDIENT_CONSTRUCTOR" =
  "ADD_INGREDIENT_CONSTRUCTOR";
export const REMOVE_INGREDIENT_CONSTRUCTOR: "REMOVE_INGREDIENT_CONSTRUCTOR" =
  "REMOVE_INGREDIENT_CONSTRUCTOR";
export const RESET_CONSTRUCTOR: "RESET_CONSTRUCTOR" = "RESET_CONSTRUCTOR";
export const MOVE_INGREDIENT_CONSTRUCTOR: "MOVE_INGREDIENT_CONSTRUCTOR" =
  "MOVE_INGREDIENT_CONSTRUCTOR";

// Экшены для запросов, связанных с ингредиентами
export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR: "GET_INGREDIENTS_ERROR" =
  "GET_INGREDIENTS_ERROR";

// Экшены для отображения и управления модальным окном с подробностями ингредиента
export const OPEN_MODAL_INGREDIENT_DETAILS: "OPEN_MODAL_INGREDIENT_DETAILS" =
  "OPEN_MODAL_INGREDIENT_DETAILS";
export const CLOSE_MODAL_INGREDIENT_DETAILS: "CLOSE_MODAL_INGREDIENT_DETAILS" =
  "CLOSE_MODAL_INGREDIENT_DETAILS";

// Экшены для работы с заказами
export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_ERROR: "GET_ORDER_ERROR" = "GET_ORDER_ERROR";
export const GET_ORDER_INFO_REQUEST: "GET_ORDER_INFO_REQUEST" =
  "GET_ORDER_INFO_REQUEST";
export const GET_ORDER_INFO_SUCCESS: "GET_ORDER_INFO_SUCCESS" =
  "GET_ORDER_INFO_SUCCESS";
export const GET_ORDER_INFO_ERROR: "GET_ORDER_INFO_ERROR" =
  "GET_ORDER_INFO_ERROR";

// Микс из 2-х прошлых контекстуальный
export const CLOSE_MODAL_ORDER_DETAILS: "CLOSE_MODAL_ORDER_DETAILS" =
  "CLOSE_MODAL_ORDER_DETAILS";

// Экшены для установки и управления WebSocket соединением для заказов и профиля пользователя
export const WS_ORDER_CONNECT: "WS_ORDER_CONNECT" = "WS_ORDER_CONNECT";
export const WS_ORDER_DISCONNECT: "WS_ORDER_DISCONNECT" = "WS_ORDER_DISCONNECT";
export const WS_ORDER_CONNECTING: "WS_ORDER_CONNECTING" = "WS_ORDER_CONNECTING";
export const WS_ORDER_OPEN: "WS_ORDER_OPEN" = "WS_ORDER_OPEN";
export const WS_ORDER_CLOSE: "WS_ORDER_CLOSE" = "WS_ORDER_CLOSE";
export const WS_ORDER_MESSAGE: "WS_ORDER_MESSAGE" = "WS_ORDER_MESSAGE";
export const WS_ORDER_ERROR: "WS_ORDER_ERROR" = "WS_ORDER_ERROR";
export const WS_PROFILE_ORDERS_CONNECT: "WS_PROFILE_ORDERS_CONNECT" =
  "WS_PROFILE_ORDERS_CONNECT";
export const WS_PROFILE_ORDERS_CONNECTING: "WS_PROFILE_ORDERS_CONNECTING" =
  "WS_PROFILE_ORDERS_CONNECTING";
export const WS_PROFILE_ORDERS_DISCONNECT: "WS_PROFILE_ORDERS_DISCONNECT" =
  "WS_PROFILE_ORDERS_DISCONNECT";
export const WS_PROFILE_ORDERS_OPEN: "WS_PROFILE_ORDERS_OPEN" =
  "WS_PROFILE_ORDERS_OPEN";
export const WS_PROFILE_ORDERS_CLOSE: "WS_PROFILE_ORDERS_CLOSE" =
  "WS_PROFILE_ORDERS_CLOSE";
export const WS_PROFILE_ORDERS_ERROR: "WS_PROFILE_ORDERS_ERROR" =
  "WS_PROFILE_ORDERS_ERROR";
export const WS_PROFILE_ORDERS_MESSAGE: "WS_PROFILE_ORDERS_MESSAGE" =
  "WS_PROFILE_ORDERS_MESSAGE";
