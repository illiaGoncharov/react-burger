export const POST_INGREDIENT = "POST_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const NEW_ARRAY_INGREDIENT = "NEW_ARRAY_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const DELETE_ALL_INRGEDIENTS = 'DELETE_ALL_INRGEDIENTS'

export const postIngredient = (data) => ({
  type: POST_INGREDIENT,
  payload: data,
});

export const moveIngredient = (data) => ({
  type: MOVE_INGREDIENT,
  payload: data,
});

export const deleteIngredient = (data) => ({
  type: DELETE_INGREDIENT,
  payload: data,
});


