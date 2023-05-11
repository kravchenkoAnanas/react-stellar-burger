import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingridientStyle from './ingiridient.module.css'

function Ingredient({element}) {
  console.log(element);
  return (
    <div className={ ingridientStyle.ingridient }>
      <img className={ ingridientStyle.image } src={ element.image } />
      {/* <Counter count={1} size="default" extraClass="m-1" /> */}
      <div className={`${ingridientStyle.price} mt-2`}>
        <p className="text text_type_digits-default">{ element.price }</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`${ingridientStyle.name} text text_type_main-default mt-2`}>{ element.name }</p>
    </div>
  )
}

export default Ingredient;