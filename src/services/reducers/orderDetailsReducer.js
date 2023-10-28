import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from "../actions/orderDetailsActions";

const initialState = {
  orderNumber: null,
  orderRequest: false,
  orderSuccess: false,
  orderFailed: false,
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
     case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.numberData,
        orderRequest: false,
        orderFailed: false,
      };
    }
    default:
      return state;
  }
};
