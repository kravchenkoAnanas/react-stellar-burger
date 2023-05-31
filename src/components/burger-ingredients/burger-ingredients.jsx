import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsHeader from './burger-ingredients-header/burger-ingredients-header';
import BurgerIngredientsBody from './burger-ingredients-body/burger-ingredients-body';

function BurgerIngredients({ ingredients }) {
  const [current, setCurrent] = useState('Булки');
  const elements = ingredients;

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

BurgerIngredients.protoTypes = {
  data: PropTypes.number
}
export default BurgerIngredients;
