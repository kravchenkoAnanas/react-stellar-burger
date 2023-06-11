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
  UNSET_INGREDIENT
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
        // chosenIngredients: action.chosenIngredients
      };
    }
    case ADD_INGREDIENT: {
      const ingredientToAdd = action.ingredient;
      let isNewBun = true;
      let processBun = false;

      let newChosenIngredients = state.chosenIngredients.map((ingredient) => {
        if (ingredientToAdd.type === 'bun' && ingredient.type === 'bun') {
          if (ingredient.name === ingredientToAdd.name) {
            processBun = true;
            isNewBun = false;
            return ingredient;
          } else {
            return ingredientToAdd;
          }
        } else {
          return ingredient;
        }
      });
      if (ingredientToAdd.type !== 'bun' || !processBun) {
        newChosenIngredients = newChosenIngredients.concat([ingredientToAdd]);
      }

      const newIngredients = state.ingredients.map((ingredient) => {
        if (ingredientToAdd.type === 'bun' && ingredient.type === 'bun') {
          if (ingredient._id === ingredientToAdd._id && isNewBun && !processBun) {
            return { ...ingredient, counter: ++ingredient.counter };
          } else {
            return { ...ingredient, counter: 0 };
          }
        }
        if (ingredient._id === ingredientToAdd._id) {
          return { ...ingredient, counter: ++ingredient.counter };
        } else {
          return ingredient;
        }
      });
      
      return {
        ...state,
        ingredients: newIngredients,
        chosenIngredients: newChosenIngredients
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
    default: {
      return state;
    }
  }
};

export const rootReducer = reducer;
