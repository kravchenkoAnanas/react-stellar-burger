import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyle from './ingredient.module.css'


function Ingredient({ element, openModal }) {
  return (
    <div className={ ingredientStyle.ingredient } onClick={ () => openModal() } > 
      <img className={ ingredientStyle.image } src={ element.image } alt="Ингредиент" />
      {/* <Counter count={1} size="default" extraClass="m-1" /> */}
      <div className={`${ingredientStyle.price} mt-2`}>
        <p className="text text_type_digits-default">{ element.price }</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`${ingredientStyle.name} text text_type_main-default mt-2`}>{ element.name }</p>
      
    </div>
  );
}

Ingredient.propTypes = {
  element: PropTypes.object,
  openModal: PropTypes.func
}
export default Ingredient;