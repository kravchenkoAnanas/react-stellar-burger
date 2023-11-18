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
}

export interface IUser {
  name: string;
  email: string;
}

export interface IMessage {
  payload: any;
  timestamp: number;
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
