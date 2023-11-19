import { postOrder, catchError } from '../api';
import { AppDispatch, AppThunk } from '../types';

export const SEND_ORDER: 'SEND_ORDER' = 'SEND_ORDER';
export const CLOSE_ORDER: 'CLOSE_ORDER' = 'CLOSE_ORDER';

export interface ISendOrder {
    readonly type: typeof SEND_ORDER;
    readonly visible: boolean;
    readonly number: number;
}
export interface ICloseOrder {
    readonly type: typeof CLOSE_ORDER;
}
export type TOorderActions =
    | ISendOrder
    | ICloseOrder;

export const sendOrder: AppThunk = (ids: string[]) => (dispatch) => {
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
