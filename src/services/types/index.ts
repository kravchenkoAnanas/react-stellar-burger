import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TConstructorActions } from '../actions/constructor';
import { TIngredientDetailsModalActions } from '../actions/ingredient_details_modal';
import { TIngredientsActions } from '../actions/ingredients';
import { TOorderActions } from '../actions/order';
import { TWsActions } from '../actions/wsActions';
import { TUserActions } from '../actions/user';

export interface IIngredint {
  type: 'bun' | 'sauce' | 'main';
  _id: string;
  name: string;
  uuid?: string;
  dragIndex?: number;
  hoverIndex?: number;
  price: number;
  image: string;
  counter: number;
  chosenUuids?: string[];
  calories?: number;
  proteins?: number;
  carbohydrates?: number;
  fat?: number;
  index: number;
}

export interface IUser {
  name: string;
  email: string;
}

export interface IOrder {
  _id: string;
  name: string;
  number: number;
  createdAt: string;
  ingredients: string[];
  status: "Выполнен" | "Отменен" | "Готовится" | "done" | "pending" | "cancel"
};

export interface IMessage {
  timestamp: number;
  total: number;
  totalToday: number;
  orders: IOrder[];
}

export interface WebSocketMessageEvent {
  data: string;
}

// MainApplication
type TApplicationActions =
    | TConstructorActions
    | TUserActions
    | TIngredientDetailsModalActions
    | TIngredientsActions
    | TOorderActions
    | TWsActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
