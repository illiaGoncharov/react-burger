import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  OPEN_MODAL_INGREDIENT_DETAILS,
  CLOSE_MODAL_INGREDIENT_DETAILS,
} from "../constants";

import { TIngredientsActions } from "../actions/ingredient";
import { TIngredient } from "../../utils/types";

// Тип для состояния в разделе ингредиентов
type TIngredientListState = {
  ingredients: TIngredient[];
  ingredientsRequest: boolean;
  ingredientsError: boolean;
  ingredientSelected: TIngredient | null;
};

// Исходное состояние для раздела ингредиентов
const ingredientInitialState: TIngredientListState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsError: false,
  ingredientSelected: null,
};

// Редуктор для раздела ингредиентов
export const ingredientReducer = (
  state = ingredientInitialState,
  action: TIngredientsActions,
): TIngredientListState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsError: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsError: true,
      };
    }
    case OPEN_MODAL_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientSelected: action.ingredientSelected,
      };
    }
    case CLOSE_MODAL_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientSelected: null,
      };
    }
    default: {
      return state;
    }
  }
};
