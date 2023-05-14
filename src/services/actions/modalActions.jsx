export const ADD_INGREDIENT_TO_MODAL = 'ADD_INGREDIENT_TO_MODAL';
export const DELETE_INGREDIENT_FROM_MODAL = 'DELETE_INGREDIENT_FROM_MODAL';

export const addIngredientToModal = (item) => {
    return {
        type: ADD_INGREDIENT_TO_MODAL,
        ingredient: item
    };
};

export const deleteIngredientFromModal = () => {
    return {
        type: DELETE_INGREDIENT_FROM_MODAL,
        ingredient: null
    };
};
