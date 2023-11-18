export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DEL_CHOSEN_INGREDIENT: 'DEL_CHOSEN_INGREDIENT' = 'DEL_CHOSEN_INGREDIENT';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';

export interface IAddIngredient {
    readonly type: typeof ADD_INGREDIENT;
    ingredient: any;
}
export interface IDelChosenIngredient {
    readonly type: typeof DEL_CHOSEN_INGREDIENT;
    uuid: any;
}
export interface IMoveIngredient {
    readonly type: typeof MOVE_INGREDIENT;
    dragIndex: any;
    hoverIndex: any;
}

export type TConstructorActions =
  | IAddIngredient
  | IDelChosenIngredient
  | IMoveIngredient;
