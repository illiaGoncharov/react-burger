import {
  ADD_INGREDIENT_CONSTRUCTOR,
  REMOVE_INGREDIENT_CONSTRUCTOR,
  RESET_CONSTRUCTOR,
  MOVE_INGREDIENT_CONSTRUCTOR,
} from "../constants";

import { TConstructorActions } from "../actions/constructor";
import { TIngredient } from "../../utils/types";

// Тип для состояния в разделе конструктора бургера
type TConstructorListState = {
  ingredientsBurgerConstructor: TIngredient[];
};

// Исходное состояние для раздела конструктора бургера
const constructorInitialState: TConstructorListState = {
  ingredientsBurgerConstructor: [],
};

// Редуктор для раздела конструктора бургера
export const constructorReducer = (
  state = constructorInitialState,
  action: TConstructorActions,
): TConstructorListState => {
  switch (action.type) {
    case ADD_INGREDIENT_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsBurgerConstructor: state.ingredientsBurgerConstructor
          ? action.item.type === "bun"
            ? [...state.ingredientsBurgerConstructor, action.item, action.item]
            : [...state.ingredientsBurgerConstructor, action.item]
          : action.item.type === "bun"
            ? [action.item, action.item]
            : [action.item],
      };
    }
    case REMOVE_INGREDIENT_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsBurgerConstructor: [
          ...state.ingredientsBurgerConstructor.filter(
            (ingredient) => ingredient.uuid !== action.uuid,
          ),
        ],
      };
    }
    case RESET_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsBurgerConstructor: [],
      };
    }
    case MOVE_INGREDIENT_CONSTRUCTOR: {
      const otherIngredients = state.ingredientsBurgerConstructor.filter(
        (ingredient) => ingredient.type !== "bun",
      );
      const bun = state.ingredientsBurgerConstructor.filter(
        (ingredient) => ingredient.type === "bun",
      );
      const otherIngredientsNew = [...otherIngredients];
      otherIngredientsNew.splice(
        action.hoverIndex,
        0,
        otherIngredientsNew.splice(action.dragIndex, 1)[0],
      );
      return {
        ...state,
        ingredientsBurgerConstructor: [...bun, ...otherIngredientsNew],
      };
    }
    default: {
      return state;
    }
  }
};
