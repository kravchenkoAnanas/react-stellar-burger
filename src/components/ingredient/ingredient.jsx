import React, { useEffect, useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyle from './ingredient.module.css'
import Modal from '../modal/modal';


function Ingredient({ element, openModal }) {

  // useEffect(() => {
  //   console.log("Mount");
  //   htmlObjects.addEventListener("click", handleOpenModal);

  //   return () => {
  //     console.log("UnMount");
  //     htmlObjects.removeEventListener("click", handleOpenModal);
  //   }
  // }, [])

  return (
    <div className={ ingredientStyle.ingredient } onClick={ () => openModal() } > 
      <img className={ ingredientStyle.image } src={ element.image } />
      {/* <Counter count={1} size="default" extraClass="m-1" /> */}
      <div className={`${ingredientStyle.price} mt-2`}>
        <p className="text text_type_digits-default">{ element.price }</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`${ingredientStyle.name} text text_type_main-default mt-2`}>{ element.name }</p>
      
    </div>
  );
}

export default Ingredient;