import {
  GET_INGREDIENTS,
  UPD_CURRENT_TAB,
  UPD_INGREDIENTS
} from './../actions/ingredients';

const initialState = {
  ingredients: [],
  currentTab: 'bun'
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      console.log("GET_INGREDIENTS", action.ingredients);
      return {
        ...state,
        ingredients: action.ingredients,
      };
    }
    case UPD_INGREDIENTS: {
      const newIngredients = state.ingredients.map((ingredient) => {
        return {
          ...ingredient,
          counter: action.ingredientIds.filter(idx => idx === ingredient._id).length
        }
      })
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
