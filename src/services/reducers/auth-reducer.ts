import {
  GET_USER_ERROR,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_DATA_USER_ERROR,
  UPDATE_DATA_USER_REQUEST,
  UPDATE_DATA_USER_SUCCESS,
  SET_AUTH_CHECKED,
  SET_USER,
} from "../constants";

import { TAuthActions } from "../actions/auth";
import { TUser } from "../../utils/types";

// Тип для состояния в разделе авторизации
type TAuthListState = {
  user: TUser | null;
  isAuthChecked: boolean;
  getUserRequest: boolean;
  getUserError: boolean;

  loginRequest: boolean;
  loginError: boolean;

  logoutRequest: boolean;
  logoutError: boolean;

  registerRequest: boolean;
  registerError: boolean;

  updateUserRequest: boolean;
  updateUserError: boolean;

  forgotPasswordRequest: boolean;
  forgotPasswordError: boolean;

  resetPasswordRequest: boolean;
  resetPasswordError: boolean;

  isPasswordChanged: boolean;
};

// Исходное состояние для раздела авторизации
const authInitialState: TAuthListState = {
  user: null,
  isAuthChecked: false,
  getUserRequest: false,
  getUserError: false,

  loginRequest: false,
  loginError: false,

  logoutRequest: false,
  logoutError: false,

  registerRequest: false,
  registerError: false,

  updateUserRequest: false,
  updateUserError: false,

  forgotPasswordRequest: false,
  forgotPasswordError: false,

  resetPasswordRequest: false,
  resetPasswordError: false,

  isPasswordChanged: false,
};

// Редуктор для раздела авторизации
export const authReducer = (
  state = authInitialState,
  action: TAuthActions,
): TAuthListState => {
  switch (action.type) {
    case SET_AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    }
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER_ERROR: {
      return {
        ...state,
        user: null,
        getUserRequest: false,
        getUserError: true,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginError: false,
        user: action.payload,
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        user: null,
        loginRequest: false,
        loginError: true,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutError: false,
        user: null,
      };
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        logoutRequest: false,
        logoutError: true,
      };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerError: false,
        user: action.payload,
      };
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        registerRequest: false,
        registerError: true,
        user: null,
      };
    }
    case UPDATE_DATA_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
      };
    }
    case UPDATE_DATA_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserError: false,
        user: action.payload,
      };
    }
    case UPDATE_DATA_USER_ERROR: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserError: true,
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isPasswordChanged: true,
        forgotPasswordRequest: false,
        forgotPasswordError: false,
      };
    }
    case FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordError: true,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        isPasswordChanged: false,
        resetPasswordError: false,
      };
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordError: true,
      };
    }
    default: {
      return state;
    }
  }
};
