import { SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS, SEND_ORDER_FAILED } from '../actions/orderActions';

const initialState = {
  isLoading: false,
  hasError: false,
  order: null
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        order: action.order,
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        hasError: true,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};
