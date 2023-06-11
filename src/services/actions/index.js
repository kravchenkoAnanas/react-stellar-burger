import { getData, postOrder, catchError } from './../api';

export const INGREDIENTS = 'INGREDIENTS';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export const SEND_ORDER = 'SEND_ORDER';
export const CLOSE_ORDER = 'CLOSE_ORDER';

export const SET_INGREDIENT = 'SET_INGREDIENT';
export const UNSET_INGREDIENT = 'UNSET_INGREDIENT';

export const DEL_CHOSEN_INGREDIENT = 'DEL_CHOSEN_INGREDIENT';

export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

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
            type: INGREDIENTS,
            ingredients: ingredients,
            // chosenIngredients: [ingredients[0]]
          })
        }
      })
      .catch(catchError)
    };
  };
  
  export function sendOrder(ids) {
    return function(dispatch) {
      postOrder(ids)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: SEND_ORDER,
            visible: true,
            number: res.order.number
          });
        }
      })
      .catch(catchError)
  };
};
