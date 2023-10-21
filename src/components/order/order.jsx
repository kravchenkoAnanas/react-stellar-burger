import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// import PropTypes from 'prop-types';
// import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderStyle from './order.module.css';
import { useSelector } from "react-redux";
// import { useDrag } from 'react-dnd';
// import { useRef } from 'react';
// import { Link, useLocation } from 'react-router-dom';

const getIngredient = (ingredients, id) => {
  const filteredIngredient = ingredients.filter((ingredient) => {
    return ingredient._id === id
  });
  if (filteredIngredient.length) {
    return filteredIngredient[0];
  }
};

const getImages = (orderIngredients) => {
  const output = [];
  for (let i = 0; i < 6; ++i) {
    let element;

    if (i < orderIngredients.length) {
      // if (i === orderIngredients.length - 1) {

      // };
      element = (
        <div
          className={ orderStyle.imageWrapper }
          style={{ zIndex: `${100 - i}` }}
          >
          <img
            src={ orderIngredients[i].image }
            className={ orderStyle.image }
            alt="order's ingredient image"
            />
        </div>
      )
    } else {
      element = (
        <div className={ orderStyle.imageWrapperEmpty }/>
        )
      }
      output.push(element);
  }
  return output;
}

function Order({ info }) {
  const { name, number, updatedAt } = info;
  const orderIngredientsIdxs = info.ingredients;
  const formattedDate = new Date(updatedAt);
  const { ingredients } = useSelector(state => state.ingredients);
  const orderIngredients = orderIngredientsIdxs.map((id) => getIngredient(ingredients, id));
  const totalSum = 480;

  console.log("ingredients", ingredients.length, ingredients[0]);
  // console.log("orderIngredientsIdxs", orderIngredientsIdxs.length, orderIngredientsIdxs[0]);
  console.log("orderIngredients", orderIngredients.length, orderIngredients[0]);

  return (
    <>
      <div className={ orderStyle.info }>
        <div className={ orderStyle.digits }>
          <p className="text text_type_digits-default">#{ number }</p>
          <FormattedDate
            date={ formattedDate}
            className="text text_type_main-default text_color_inactive"
          />
        </div>
        <p className="text text_type_main-medium">{ name }</p>
        <div className={ orderStyle.total }>
          <div className={ orderStyle.images }> {
            getImages(orderIngredients)
          }
          </div>
          <div className={ orderStyle.sum }>
            <p className="text text_type_digits-default">{ totalSum }</p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </>
  );
}

Order.propTypes = {
}
export default Order;