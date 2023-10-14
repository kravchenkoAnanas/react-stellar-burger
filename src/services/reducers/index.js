import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { ingredientDetailsModalReducer } from './ingredient_details_modal';
import { orderReducer } from './order';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredientsDetailModal: ingredientDetailsModalReducer,
  order: orderReducer,
  user: userReducer
});
