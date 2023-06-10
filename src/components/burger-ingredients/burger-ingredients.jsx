import { useState } from 'react';
import BurgerIngredientsHeader from './burger-ingredients-header/burger-ingredients-header';
import BurgerIngredientsBody from './burger-ingredients-body/burger-ingredients-body';
import { useSelector } from 'react-redux';

function BurgerIngredients() {
  const [current, setCurrent] = useState('Булки');

  const { ingredients } = useSelector(state => state);

  const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
  const mains = ingredients.filter(ingredient => ingredient.type === 'main');
  const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce');

  return (
    <div>
      <BurgerIngredientsHeader current={ current } setCurrent={ setCurrent } />
      <BurgerIngredientsBody buns={ buns } mains={ mains } sauces={ sauces } />
    </div>
  ) 
}

export default BurgerIngredients;
