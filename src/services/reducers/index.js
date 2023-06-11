import { v4 as uuidv4 } from 'uuid';

import {
  INGREDIENTS,
  ADD_INGREDIENT,
  SEND_ORDER,
  CLOSE_ORDER,
  SET_INGREDIENT,
  UNSET_INGREDIENT,
  DEL_CHOSEN_INGREDIENT,
  MOVE_INGREDIENT,
  UPD_CURRENT_TAB
} from './../actions/index';

const initialState = {
  ingredients: [],
  chosenIngredients: [],
  orderVisible: false,
  orderNumber: null,
  ingredientVisible: false,
  ingredientInfo: null,
  currentTab: 'bun'
};

export const reducer = (state = initialState, action) => {
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
      let chosenUuid = null;

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
        chosenUuid = uuidv4()
        ingredientToAdd['uuid'] = chosenUuid;
        newChosenIngredients = newChosenIngredients.concat([ingredientToAdd]);
      }

      const newIngredients = state.ingredients.map((ingredient) => {
        if (ingredientToAdd.type === 'bun' && ingredient.type === 'bun') {
          if (ingredient._id === ingredientToAdd._id && isNewBun && !processBun) {
            return {
              ...ingredient,
              counter: ++ingredient.counter,
              chosenUuids: ingredient.chosenUuids.concat([chosenUuid])
            };
          } else if (!isNewBun && processBun) {
            return { ...ingredient };
          } else {
            return { ...ingredient, counter: 0 };
          }
        }
        if (ingredient._id === ingredientToAdd._id) {
          return {
            ...ingredient,
            counter: ++ingredient.counter,
            chosenUuids: ingredient.chosenUuids.concat([chosenUuid])
          };
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
    case DEL_CHOSEN_INGREDIENT: {
      return {
        ...state,
        chosenIngredients: state.chosenIngredients.filter((ingredient) => {
          if (ingredient.uuid !== action.uuid) {
            return ingredient;
          }
        }),
        ingredients: state.ingredients.map((ingredient) => {
          if (ingredient.chosenUuids.includes(action.uuid)) {
            const newChosenUuids = ingredient.chosenUuids.filter((uuid) => {
              if (uuid !== action.uuid) {
                return uuid
              }
            })
            return {
              ...ingredient,
              chosenUuids: newChosenUuids,
              counter: --ingredient.counter
            }
          } else {
            return ingredient;
          }
        })
      }
    }
    case MOVE_INGREDIENT: {
      const { dragIndex, hoverIndex } = action;
      const newChosenIngredients = state.chosenIngredients.slice();      
      const objToInsert = newChosenIngredients[dragIndex];

      newChosenIngredients.splice(dragIndex, 1);
      newChosenIngredients.splice(hoverIndex, 0, objToInsert);

      return {
        ...state,
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
    case UPD_CURRENT_TAB: {
      let newCurrentTab;

      if (action.scrollTop < action.bunsRowsSize) {
        newCurrentTab = 'bun';
      } else if (action.scrollTop < action.sauceRowsSize) {
        newCurrentTab = 'sauce';
      } else {
        newCurrentTab = 'main';
      }
      return {
        ...state,
        currentTab: newCurrentTab
      }
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = reducer;
