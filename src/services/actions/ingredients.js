import { getData, catchError } from './../api';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';

export const SET_INGREDIENT = 'SET_INGREDIENT';
export const UNSET_INGREDIENT = 'UNSET_INGREDIENT';

export const UPD_CURRENT_TAB = 'UPD_CURRENT_TAB';

export function getIngredients() {
  return function(dispatch) {
    getData()
      .then(res => {
        if (res) {
          const ingredients = res.data.map((ingredient) => {
            const extendedIngredient = ingredient;
            extendedIngredient['counter'] = 0;
            extendedIngredient['chosenUuids'] = [];
            return extendedIngredient;
          })

          dispatch({
            type: GET_INGREDIENTS,
            ingredients: ingredients,
            // chosenIngredients: [ingredients[0]]
          })
        }
      })
      .catch(catchError)
  };
};