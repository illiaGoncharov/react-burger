export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_TOTAL_SUM = 'SET_TOTAL_SUM';

export const constructorReducer = (state, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
        totalSum: state.totalSum + action.payload.price
      }
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((item) => item._id !== action.payload._id),
        totalSum: state.totalSum - action.payload.price
      }
    case SET_TOTAL_SUM:
        const {
            ingredients
        } = action.payload;
        const bun = ingredients.find((item) => item.type === "bun");
        const otherIngredients = ingredients.filter((item) => item.type !== "bun");
        const sum = bun ? bun.price * 2 : 0;
        const totalSum = otherIngredients.reduce((acc, item) => acc + item.price, sum);
        return {
            ...state,
            totalSum: totalSum,
    };
    default:
        return state;
    }
}