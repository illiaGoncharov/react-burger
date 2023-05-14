import { ADD_INGREDIENT_TO_MODAL, DELETE_INGREDIENT_FROM_MODAL } from '../actions/modalActions';

const initialModalState = {
  selectedIngredient: null,
};

export const modalReducer = (state = initialModalState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_MODAL: {
      return {
        ...state,
        selectedIngredient: action.ingredient,
      };
    }
    case DELETE_INGREDIENT_FROM_MODAL: {
      return {
        ...state,
        selectedIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};
