import { getData, postOrder, catchError } from './../api';

export const INGREDIENTS = 'INGREDIENTS';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export const SEND_ORDER = 'SEND_ORDER';
export const CLOSE_ORDER = 'CLOSE_ORDER';

export const SET_INGREDIENT = 'SET_INGREDIENT';
export const UNSET_INGREDIENT = 'UNSET_INGREDIENT';

export function getIngredients() {
  return function(dispatch) {
    getData()
      .then(res => {
        if (res) {
          dispatch({
            type: INGREDIENTS,
            ingredients: res.data,
            chosenIngredients: [res.data[0]]
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
