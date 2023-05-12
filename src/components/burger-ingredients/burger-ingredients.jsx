import React from 'react';
import BurgerIngredientsHeader from './burger-ingredients-header/burger-ingredients-header';
import BurgerIngredientsBody from './burger-ingredients-body/burger-ingredients-body';

function BurgerIngredients(data) {
  const [current, setCurrent] = React.useState('Булки')

  const elements = data.data;

  const buns = elements.filter(element => element.type === 'bun');
  const mains = elements.filter(element => element.type === 'main');
  const sauces = elements.filter(element => element.type === 'sauce');

  return (
    <div>
      <BurgerIngredientsHeader current={ current } setCurrent={ setCurrent } />
      <BurgerIngredientsBody buns={ buns } mains={ mains } sauces={ sauces } />
    </div>
  ) 
}

export default BurgerIngredients;
