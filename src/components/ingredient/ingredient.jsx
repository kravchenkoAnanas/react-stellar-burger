import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyle from './ingredient.module.css'


function Ingredient({ element, clickCallBack }) {
  return (
    <div className={ ingredientStyle.ingredient } onClick={ () => clickCallBack() } > 
      <img className={ ingredientStyle.image } src={ element.image } alt={ element.name } />
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
  clickCallBack: PropTypes.func
}
export default Ingredient;