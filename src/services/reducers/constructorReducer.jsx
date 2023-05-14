import { ADD_INGREDIENT, DELETE_INGREDIENT, ADD_BUN, UPDATE_INGREDIENTS, RESET_INGREDIENTS } from "../actions/constructorActions";

const initialState = {
  stuffings: [],
  bun: null,
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: { ...action.bun },
      };
    case ADD_INGREDIENT:
      return {
        ...state,
        stuffings: [...(state.stuffings || []), action.payload],
      };
    case UPDATE_INGREDIENTS:
      return {
        ...state,
        stuffings: action.ingredients,
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        stuffings: state.stuffings.filter((item) => item.id !== action.id),
      };
    case RESET_INGREDIENTS:
      return {
        ...state,
        stuffings: [],
        bun: null,
      };
    default:
      return state;
  }
};
