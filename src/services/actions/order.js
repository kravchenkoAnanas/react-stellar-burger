import { postOrder, catchError } from './../api';

export const SEND_ORDER = 'SEND_ORDER';
export const CLOSE_ORDER = 'CLOSE_ORDER';

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
