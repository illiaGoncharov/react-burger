import {
  ADD_INGREDIENT_CONSTRUCTOR,
  REMOVE_INGREDIENT_CONSTRUCTOR,
  MOVE_INGREDIENT_CONSTRUCTOR,
  RESET_CONSTRUCTOR,
} from "../constants";

import { TIngredient } from "../../utils/types";


export interface IResetConstructor {
  readonly type: typeof RESET_CONSTRUCTOR;
}

export interface IAddIngredientConstructor {
  readonly type: typeof ADD_INGREDIENT_CONSTRUCTOR;
  readonly item: TIngredient;
}

export interface IRemoveIngredientConstructor {
  readonly type: typeof REMOVE_INGREDIENT_CONSTRUCTOR;
  readonly uuid: string;
}

export interface IMoveIngredientConstructor {
  readonly type: typeof MOVE_INGREDIENT_CONSTRUCTOR;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

// Объединение типов действий
export type TConstructorActions =
  | IResetConstructor
  | IAddIngredientConstructor
  | IRemoveIngredientConstructor
  | IMoveIngredientConstructor;

// Действие для добавления ингредиента в конструктор
export function addIngredient(
  item: TIngredient,
  uuid: string,
): IAddIngredientConstructor {
  return {
    type: ADD_INGREDIENT_CONSTRUCTOR,
    item: { ...item, uuid: uuid },
  };
}

// Действие для удаления ингредиента из конструктора
export function removeIngredient(uuid: string): IRemoveIngredientConstructor {
  return {
    type: REMOVE_INGREDIENT_CONSTRUCTOR,
    uuid,
  };
}

// Действие для перемещения ингредиента в конструкторе
export function moveIngredient(
  dragIndex: number,
  hoverIndex: number,
): IMoveIngredientConstructor {
  return {
    type: MOVE_INGREDIENT_CONSTRUCTOR,
    dragIndex,
    hoverIndex,
  };
}
