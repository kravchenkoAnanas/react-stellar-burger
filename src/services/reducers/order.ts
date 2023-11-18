import {
  SEND_ORDER,
  CLOSE_ORDER,
  TOorderActions,
} from '../actions/order';

type TOrdersType = {
  orderVisible: boolean,
  orderNumber: number | null,
}

const initialState: TOrdersType = {
  orderVisible: false,
  orderNumber: null,
};

export const orderReducer = (
  state = initialState,
  action: TOorderActions
  ): TOrdersType => {

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
