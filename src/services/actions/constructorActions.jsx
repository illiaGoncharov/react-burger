export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';
export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';
export const RESET_INGREDIENTS = 'RESET_INGREDIENTS';

export const addIngredient = (item) => ({
  type: ADD_INGREDIENT,
  payload: { ...item, id: crypto.randomUUID() }
});

export const addBun = (bun) => ({ type: ADD_BUN, bun });

export const updateIngredients = (ingredients) => ({ type: UPDATE_INGREDIENTS, ingredients });

export const deleteIngredient = (id) => ({ type: DELETE_INGREDIENT, id });

export const resetIngredients = () => ({ type: RESET_INGREDIENTS });
