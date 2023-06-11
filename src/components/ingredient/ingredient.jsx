import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyle from './ingredient.module.css';
import { useDrag } from 'react-dnd';
import { useRef, useEffect } from 'react';

function Ingredient({ element, clickCallBack }) {
  const { name, image, price, counter } = element;
  const ref = useRef();
  
  const [{ isDrag }, dragRef] = useDrag({
      type: "ingredient",
      item: {element},
      collect: monitor => ({
        isDrag: monitor.isDragging()
      })
  });

  const showCounter = () => {
    if (counter > 0) {
      return (
        <div className={ ingredientStyle.counter }>
          <Counter count={ counter } size="default" />
        </div>
      );
    }
  };

  dragRef(ref);

  return (
    <div className={ ingredientStyle.ingredient } onClick={ () => clickCallBack() } ref={ref} >
      <img className={ ingredientStyle.image } src={ image } alt={ name } />
      { showCounter() }
      <div className={`${ingredientStyle.price} mt-2`}>
        <p className="text text_type_digits-default">{ price }</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`${ingredientStyle.name} text text_type_main-default mt-2`}>{ name }</p>
    </div>
  );
}

Ingredient.propTypes = {
  element: PropTypes.object,
  clickCallBack: PropTypes.func
}
export default Ingredient;