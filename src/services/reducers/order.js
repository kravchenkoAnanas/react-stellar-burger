import {
  SEND_ORDER,
  CLOSE_ORDER,
} from './../actions/order';

const initialState = {
  orderVisible: false,
  orderNumber: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER: {
      return {
        ...state,
        orderVisible: action.visible,
        orderNumber: action.number
      }
    }
    case CLOSE_ORDER: {
      return {
        ...state,
        orderVisible: initialState.orderVisible,
        orderNumber: initialState.orderNumber
      }
    }
    default: {
      return state;
    }
  }
};
