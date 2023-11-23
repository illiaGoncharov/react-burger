import {
  OPEN_MODAL_INGREDIENT_DETAILS,
  CLOSE_MODAL_INGREDIENT_DETAILS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
} from "../constants";

import { getIngredientsData } from "../../utils/api-burger";

import { AppDispatch } from "../types";
import { TIngredient } from "../../utils/types";

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
}

export interface IGetIngredientsError {
  readonly type: typeof GET_INGREDIENTS_ERROR;
}

// Типы действий для модального окна деталей ингредиента
export interface IOpenModalIngredientDetails {
  readonly type: typeof OPEN_MODAL_INGREDIENT_DETAILS;
  readonly ingredientSelected: TIngredient;
}

export interface ICloseModalIngredientDetails {
  readonly type: typeof CLOSE_MODAL_INGREDIENT_DETAILS;
}

// Объединение всех возможных типов
export type TIngredientsActions =
  | IGetIngredientsRequest
  | IGetIngredientsError
  | IGetIngredientsSuccess
  | IOpenModalIngredientDetails
  | ICloseModalIngredientDetails;

// Функция для запроса ингредиентов

export const getIngredients = () => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });

    try {
      const res = await getIngredientsData();
      const ingredients: TIngredient[] = res.data;

      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: GET_INGREDIENTS_ERROR,
      });
    }
  };
};

// Функция для открытия модального окна деталей ингредиента
export const openModalIngredientDetails = (
  ingredientSelected: TIngredient,
): IOpenModalIngredientDetails => {
  return {
    type: OPEN_MODAL_INGREDIENT_DETAILS,
    ingredientSelected,
  };
};

// Функция для закрытия
export const closeModalIngredientDetails = (): ICloseModalIngredientDetails => {
  return {
    type: CLOSE_MODAL_INGREDIENT_DETAILS,
  };
};
