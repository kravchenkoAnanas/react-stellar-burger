import { getData, catchError } from '../api';
import { AppDispatch, AppThunk, IIngredint } from '../types';
import { SET_INGREDIENT } from './ingredient_details_modal';

export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const UPD_CURRENT_TAB: 'UPD_CURRENT_TAB' = 'UPD_CURRENT_TAB';
export const UPD_INGREDIENTS: 'UPD_INGREDIENTS' = 'UPD_INGREDIENTS';

export interface IGetIngredients {
  readonly type: typeof GET_INGREDIENTS;
  ingredients: IIngredint[];
}
export interface IUpdCurrentTab {
  readonly type: typeof UPD_CURRENT_TAB;
  isSection1: boolean;
  isSection2: boolean;
  isSection3: boolean;
}
export interface IUpdIngredients {
  readonly type: typeof UPD_INGREDIENTS;
  ingredientIds: string[];
}
export type TIngredientsActions =
  | IGetIngredients
  | IUpdCurrentTab
  | IUpdIngredients;

export const getIngredients: AppThunk = (idx?: string) => (dispatch: AppDispatch) => {
    getData()
      .then(res => {
        if (res) {
          const ingredients = res.data.map((ingredient: IIngredint) => {
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
            const filtered = ingredients.filter((ingredient: IIngredint) => {
              return ingredient._id === idx;
            })
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