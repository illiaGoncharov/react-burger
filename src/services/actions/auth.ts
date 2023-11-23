import {
  getDataUser,
  updateDataUser,
  loginProfile,
  logoutProfile,
  registerUser,
  forgotPasswordUser,
  resetPasswordUser,
} from "../../utils/api-auth";

import {
  GET_USER_ERROR,
  SET_AUTH_CHECKED,
  SET_USER,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  UPDATE_DATA_USER_REQUEST,
  UPDATE_DATA_USER_ERROR,
  UPDATE_DATA_USER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} from "../constants";

import { AppDispatch } from "../types";
import { TForm, TUser } from "../../utils/types";

export interface IGetUserError {
  readonly type: typeof GET_USER_ERROR;
}

export interface ISetAuthChecked {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: boolean;
}

export interface ISetUser {
  readonly type: typeof SET_USER;
  readonly payload: TUser | null;
}

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginError {
  readonly type: typeof LOGIN_ERROR;
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: TUser;
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutError {
  readonly type: typeof LOGOUT_ERROR;
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterError {
  readonly type: typeof REGISTER_ERROR;
}

export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
  readonly payload: TUser;
}

export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordError {
  readonly type: typeof FORGOT_PASSWORD_ERROR;
}

export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordError {
  readonly type: typeof RESET_PASSWORD_ERROR;
}

export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IUpdateDataUserRequest {
  readonly type: typeof UPDATE_DATA_USER_REQUEST;
}

export interface IUpdateDataUserError {
  readonly type: typeof UPDATE_DATA_USER_ERROR;
}

export interface IUpdateDataUserSuccess {
  readonly type: typeof UPDATE_DATA_USER_SUCCESS;
  readonly payload: TUser;
}

// Объединение всех возможных типов действий
export type TAuthActions =
  | ILoginRequest
  | ILoginError
  | ILoginSuccess
  | ILogoutRequest
  | ILogoutError
  | ILogoutSuccess
  | IRegisterRequest
  | IRegisterError
  | IRegisterSuccess
  | IForgotPasswordRequest
  | IForgotPasswordError
  | IForgotPasswordSuccess
  | IResetPasswordRequest
  | IResetPasswordError
  | IResetPasswordSuccess
  | IUpdateDataUserRequest
  | IUpdateDataUserError
  | IUpdateDataUserSuccess
  | IGetUserError
  | ISetAuthChecked
  | ISetUser;

// Действия для установки флага проверки аутентификации
export const setAuthChecked = (value: boolean): ISetAuthChecked => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

// Действие для установки пользователя
export const setUser = (user: TUser | null): ISetUser => ({
  type: SET_USER,
  payload: user,
});

// Функция для получения данных пользователя
export const getUser = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await getDataUser();
      dispatch(setUser(res.user));
    } catch {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };
};

// Функция для входа пользователя
export const login = (data: TForm) => {
  return async function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    try {
      const res = await loginProfile(data);
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };
};

// Функция для проверки аутентификации пользователя
export const checkUserAuth = () => {
  return async (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      try {
        await dispatch(getUser());
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(null));
      } finally {
        dispatch(setAuthChecked(true));
      }
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

// Функция для выхода пользователя
export const logout = (data: string | null) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    try {
      await logoutProfile(data);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      dispatch(setUser(null));
    } catch (error) {
      dispatch({
        type: LOGOUT_ERROR,
      });
    }
  };
};

// Функция для регистрации пользователя
export const register = (data: TForm) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    try {
      const res = await registerUser(data);
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.user,
      });
      dispatch(setAuthChecked(true));
    } catch (error) {
      dispatch({
        type: REGISTER_ERROR,
      });
    }
  };
};

// Функция для обновления данных пользователя
export const updateUser = (data: TForm) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: UPDATE_DATA_USER_REQUEST,
    });
    try {
      const res = await updateDataUser(data);
      dispatch({
        type: UPDATE_DATA_USER_SUCCESS,
        payload: res.user,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DATA_USER_ERROR,
      });
    }
  };
};

// Функция для запроса сброса пароля
export const forgotPassword = (data: TForm) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    try {
      await forgotPasswordUser(data);
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
      });
    }
  };
};

// Функция для сброса пароля
export const resetPassword = (data: TForm) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    try {
      await resetPasswordUser(data);
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_ERROR,
      });
    }
  };
};
