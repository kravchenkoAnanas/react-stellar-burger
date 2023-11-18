export const SET_INGREDIENT: 'SET_INGREDIENT' = 'SET_INGREDIENT';
export const UNSET_INGREDIENT: 'UNSET_INGREDIENT' = 'UNSET_INGREDIENT';

export interface ISetIngredient {
    readonly type: typeof SET_INGREDIENT;
    data: any;
}
export interface IUnsetIngredient {
    readonly type: typeof UNSET_INGREDIENT;
}
export type TIngredientDetailsModalActions =
    | ISetIngredient
    | IUnsetIngredient;
