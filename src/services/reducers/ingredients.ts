import {
  GET_INGREDIENTS,
  TIngredientsActions,
  UPD_CURRENT_TAB,
  UPD_INGREDIENTS
} from '../actions/ingredients';

// const initialState = {
//   ingredients: [],
//   currentTab: 'bun'
// };

interface Ingredient {
  _id: string;
  // Add other properties as needed...
}

type TIngredientsType = {
  ingredients: Ingredient[];
  currentTab: 'bun' | 'sauce' | 'main';
}

const initialState: TIngredientsType = {
  ingredients: [],
  currentTab: 'bun'
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
  ): TIngredientsType => {

  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients,
      };
    }
    case UPD_INGREDIENTS: {
      const newIngredients = state.ingredients.map((ingredient) => {
        return {
          ...ingredient,
          counter: action.ingredientIds.filter((idx: any) => {
            return idx === ingredient._id;
          }).length
        }
      })
      return {
        ...state,
        ingredients: newIngredients
      }
    }
    case UPD_CURRENT_TAB: {
      let newCurrentTab: 'bun' | 'sauce' | 'main';

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
