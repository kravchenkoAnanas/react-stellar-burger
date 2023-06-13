import {
  SET_INGREDIENT,
  UNSET_INGREDIENT
} from './../actions/ingredient_details_modal';

const initialState = {
  ingredientVisible: false,
  ingredientInfo: null
};

export const ingredientDetailsModalReducer = (state = initialState, action) => {
  switch (action.type) {
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
