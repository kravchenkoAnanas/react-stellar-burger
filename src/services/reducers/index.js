// список всех полученных ингредиентов,
// список всех ингредиентов в текущем конструкторе бургера,
// объект текущего просматриваемого ингредиента,
// объект созданного заказа.

// ingredientsReducer;
// chosenIngredientsReducer;
// orderReducer

import {
  INGREDIENTS,
  ADD_INGREDIENT,
  SEND_ORDER,
  CLOSE_ORDER
} from './../actions/index';

const initialState = {
  ingredients: [],
  chosenIngredients: [],
  orderVisible: false,
  orderNumber: null
};

export const reducer = (state = initialState, action) => {
  console.log('reducer -> action', action);
  switch (action.type) {
    case INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients,
        chosenIngredients: action.chosenIngredients
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        chosenIngredients: state.chosenIngredients.concat([action.ingredient])
      }
    }
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
    // case INCREASE_ITEM: {
    //   return {
    //     ...state,
    //     items: [...state.items].map(item =>
    //       item.id === action.id ? { ...item, qty: ++item.qty } : item
    //     )
    //   };
    // }
    // case DECREASE_ITEM: {
    //   return {
    //     ...state,
    //     items: [...state.items].map(item =>
    //       item.id === action.id ? { ...item, qty: --item.qty } : item
    //     )
    //   };
    // }
    // case DELETE_ITEM: {
    //   return { ...state, items: [...state.items].filter(item => item.id !== action.id) };
    // }
    default: {
      return state;
    }
  }
};

export const rootReducer = reducer;

// export const rootReducer = combineReducers({
//   ingredients: ingredientsReducer,
//   chosenIngredients: chosenIngredientsReducer,
//   order: orderReducer,
// });
