export const GET_INFO_INGREDIENT = "GET_INFO_INTEDIENT";
export const DELETE_INFO_INGREDIENT = "DELETE_INFO_INGREDIENT";

export const getInfoIngredient = (data) => ({
  type: GET_INFO_INGREDIENT,
  payload: data,
});
