import orderStyle from './../components/order/order.module.css';
import { IIngredint, IOrder } from '../services/types';


export const getStatus = (order: IOrder) => {
   let status = 'Выполнен';
   let statusStyle = '';
   if (order.status === 'pending') {
      status = "Готовится"
      statusStyle = orderStyle.status_pending;
   } else if (order.status === 'cancel') {
      status = "Отменен"
      statusStyle = orderStyle.status_canceled;
   }
   return [status, statusStyle];
}

export const getIngredient = (ingredients: IIngredint[], id: string): IIngredint | undefined => {
   const filteredIngredient = ingredients.filter(ingredient => {
     return ingredient._id === id
   });
   if (filteredIngredient.length) {
     return filteredIngredient[0];
   }
};

export const totalSum = (ingredients: IIngredint[]) => {
   let sum = 0;
   ingredients.map(ingredient => { 
      sum += ingredient.price
   });
   return sum;
};