import { getData, catchError } from './../api';
import { SET_INGREDIENT } from './ingredient_details_modal';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const UPD_CURRENT_TAB = 'UPD_CURRENT_TAB';
export const UPD_INGREDIENTS = 'UPD_INGREDIENTS';

export function getIngredients(idx) {
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
          })

          if (idx) {
            const filtered = ingredients.filter(ingredient => ingredient._id === idx)
            if (filtered.length === 1) {
              dispatch({
                type: SET_INGREDIENT,
                data: filtered[0]
              })
            }
          }
        }
      })
      .catch(catchError)
  };
};