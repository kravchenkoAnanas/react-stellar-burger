import {
  ADD_INGREDIENT,
  DEL_CHOSEN_INGREDIENT,
  MOVE_INGREDIENT,
} from './../actions/constructor';

const initialState = {
  chosenIngredients: []
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const ingredientToAdd = action.ingredient;
      let processBun;

      let newChosenIngredients = state.chosenIngredients.map((ingredient) => {
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
        chosenUuid = uuidv4()
        ingredientToAdd['uuid'] = chosenUuid;
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
    default: {
      return state;
    }
  }
};
