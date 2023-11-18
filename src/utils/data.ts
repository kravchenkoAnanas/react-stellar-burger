// import orderStyle from './order.module.css';
import React from 'react';
import orderStyle from './../components/order/order.module.css';
import { IIngredint } from '../services/types';


export const getStatus = (orderStatus: any) => {
   let status = 'Выполнен';
   let statusStyle = '';
   if (orderStatus === 'pending') {
      status = "Готовится"
      statusStyle = orderStyle.status_pending;
   } else if (orderStatus === 'cancel') {
      status = "Отменен"
      statusStyle = orderStyle.status_canceled;
   }
   return [status, statusStyle];
}

export const getIngredient = (ingredients: IIngredint[], id: string): IIngredint | undefined => {
   const filteredIngredient = ingredients.filter((ingredient: IIngredint) => {
     return ingredient._id === id
   });
   if (filteredIngredient.length) {
     return filteredIngredient[0];
   }
};

export const totalSum = (ingredients: any) => {
   let sum = 0;
   ingredients.map((ingredient: any) => { sum += ingredient.price });
   return sum;
};