import { v4 as uuidv4 } from 'uuid';

import {
  GET_INGREDIENTS,
  ADD_INGREDIENT,
  SET_INGREDIENT,
  UNSET_INGREDIENT,
  UPD_CURRENT_TAB
} from './../actions/ingredients';

const initialState = {
  ingredients: [],
  currentTab: 'bun'
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients,
      };
    }
    case ADD_INGREDIENT: {
      const ingredientToAdd = action.ingredient;

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

      // const newIngredients = state.ingredients.map((ingredient) => {
      //   if (ingredientToAdd.type === 'bun' && ingredient.type === 'bun') {
      //     if (ingredient._id === ingredientToAdd._id && isNewBun && !processBun) {
      //       return {
      //         ...ingredient,
      //         counter: ++ingredient.counter,
      //         chosenUuids: ingredient.chosenUuids.concat([chosenUuid])
      //       };
      //     } else if (!isNewBun && processBun) {
      //       return { ...ingredient };
      //     } else {
      //       return { ...ingredient, counter: 0 };
      //     }
      //   }
      //   if (ingredient._id === ingredientToAdd._id) {
      //     return {
      //       ...ingredient,
      //       counter: ++ingredient.counter,
      //       chosenUuids: ingredient.chosenUuids.concat([chosenUuid])
      //     };
      //   } else {
      //     return ingredient;
      //   }
      // });

      return {
        ...state,
        ingredients: newIngredients,
        chosenIngredients: newChosenIngredients
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
    case UPD_INGREDIENTS {
      const chosenIngredients = action.chosenIngredients;

      const newIngredients = state.ingredients.map((ingredient) => {
        return ingredient;
      });
      return {
        ...state,
        ingredients: newIngredients
      }
    }
    case UPD_CURRENT_TAB: {
      let newCurrentTab;

      if (action.isSection1) {
        newCurrentTab = 'bun';
      } else if (action.isSection2) {
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
