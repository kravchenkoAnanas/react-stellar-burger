import {
  SET_INGREDIENT,
  TIngredientDetailsModalActions,
  UNSET_INGREDIENT
} from '../actions/ingredient_details_modal';
import { IIngredint } from '../types';

type TIngredientDetailsModalType = {
  ingredientVisible: boolean;
  ingredientInfo: IIngredint | null;
}

const initialState: TIngredientDetailsModalType = {
  ingredientVisible: false,
  ingredientInfo: null
};

export const ingredientDetailsModalReducer = (
  state = initialState,
  action: TIngredientDetailsModalActions
  ): TIngredientDetailsModalType => {

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
        ingredientInfo: initialState.ingredientInfo,
      }
    }
    default: {
      return state;
    }
  }
};
