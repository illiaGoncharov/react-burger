import { ActionCreator } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { store } from "../store";

import { TAuthActions } from "../actions/auth";
import { TIngredientsActions } from "../actions/ingredient";
import { TOrderFeedActions } from "../actions/order-feed";
import { TOrderActions } from "../actions/order";
import { TConstructorActions } from "../actions/constructor";
import { TProfileOrdersActions } from "../actions/profile-orders";

type TApplicationActions =
  | TAuthActions
  | TOrderFeedActions
  | TOrderActions
  | TIngredientsActions
  | TProfileOrdersActions
  | TConstructorActions;

// Определение типа для корневого состояния приложения
export type RootState = ReturnType<typeof store.getState>;
// Определение типа для диспетчера приложения с использованием redux-thunk
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
// Определение типа для асинхронных thunk-действий
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, unknown, RootState, TApplicationActions>
>;
