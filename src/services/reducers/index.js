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
  CLOSE_ORDER,
  SET_INGREDIENT,
  UNSET_INGREDIENT,
  DROP_INGREDIENT
} from './../actions/index';

const initialState = {
  ingredients: [],
  chosenIngredients: [],
  orderVisible: false,
  orderNumber: null,
  ingredientVisible: false,
  ingredientInfo: null
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
    case SET_INGREDIENT: {
      return {
        ...state,
        ingredientVisible: true,
        ingredientInfo: action.data,
      }
    }
    case UNSET_INGREDIENT: {
      return {
        ...state,
        ingredientVisible: initialState.ingredientVisible,
        ingredientInfo: initialState.ingredientVisible,
      }
    }
    case DROP_INGREDIENT: {
      console.log('DROP_INGREDIENT', action.element);
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => {
          return ingredient._id === action.element._id
          ? { ...ingredient, counter: ++ingredient.counter }
          : ingredient;
        }),
        chosenIngredients: state.chosenIngredients.concat([action.element])
      }
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = reducer;
