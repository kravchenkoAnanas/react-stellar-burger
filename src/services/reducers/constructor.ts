import { v4 as uuidv4 } from 'uuid';
import {
  ADD_INGREDIENT,
  DEL_CHOSEN_INGREDIENT,
  MOVE_INGREDIENT,
  TConstructorActions,
} from '../actions/constructor';
import { IIngredint } from '../types';

type TConstructorType = {
  chosenIngredients: ReadonlyArray<IIngredint>;
}

const initialState: TConstructorType = {
  chosenIngredients: []
};

export const constructorReducer = (
  state = initialState, 
  action: TConstructorActions
  ): TConstructorType => {

  switch (action.type) {
    case ADD_INGREDIENT: {
      const ingredientToAdd = action.ingredient;
      let processBun = false;

      let newChosenIngredients = state.chosenIngredients.map(ingredient => {
        if (ingredientToAdd.type === 'bun' && ingredient.type === 'bun') {
          if (ingredient.name === ingredientToAdd.name) {
            processBun = true;
            return ingredient;
          } else {
            return ingredientToAdd;
          }
        } else {
          return ingredient;
        }
      });
      if (ingredientToAdd.type !== 'bun' || !processBun) {
        ingredientToAdd['uuid'] = uuidv4();
        newChosenIngredients = newChosenIngredients.concat([ingredientToAdd]);
      }

      return {
        ...state,
        chosenIngredients: newChosenIngredients
      }
    }
    case DEL_CHOSEN_INGREDIENT: {
      return {
        ...state,
        chosenIngredients: state.chosenIngredients.filter(ingredient => {
          if (ingredient.uuid !== action.uuid) {
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
    default: {
      return state;
    }
  }
};
