// import orderStyle from './order.module.css';
import orderStyle from './../components/order/order.module.css';


export const getStatus = (orderStatus) => {
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

export const getIngredient = (ingredients, id) => {
   const filteredIngredient = ingredients.filter((ingredient) => {
     return ingredient._id === id
   });
   if (filteredIngredient.length) {
     return filteredIngredient[0];
   }
};
 
export const getImages = (orderIngredients) => {
   const output = [];
   const maxElements = 6;
 
   for (let i = 0; i < maxElements; ++i) {
     let element;
 
     if (i < orderIngredients.length) {
       element = (
         <div
           className={ orderStyle.imageWrapper }
           style={{ zIndex: `${100 - i}` }}
           key={ i }
          >
           {i !== maxElements - 1 &&
             <img
             src={ orderIngredients[i].image }
             className={ orderStyle.image }
             alt="order's ingredient image"
             key={ i }
             />
           }
           {i === maxElements - 1 && orderIngredients.length - maxElements &&
           <>
             <img
               src={ orderIngredients[i].image }
               className={ orderStyle.image }
               alt="order's ingredient image"
               style={{ filter: "brightness(50%)" }}
               key={ i + 1}
               />
             <p
               className={ orderStyle.frontImgText }
               key={ i + 2 }
             >
               +{orderIngredients.length - maxElements}
             </p>
           </>
           }
         </div>
       )
     } else {
       element = (
         <div
          className={ orderStyle.imageWrapperEmpty }
          key={ i }
          />
         )
       }
      output.push(element);
   }
   return output;
};
 
export const totalSum = (ingredients) => {
   let sum = 0;
   ingredients.map(ingredient => { sum += ingredient.price });
   return sum;
};