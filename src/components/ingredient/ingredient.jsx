import React, { useEffect, useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyle from './ingredient.module.css'
import Modal from '../modal/modal';


function Ingredient({ element }) {
  const [state, setState] = useState({ visible: false });
  
  const handleOpenModal = (data) => {
    setState({ visible: true });
  }

  const handleCloseModal = () => {
    setState({ visible: false });
  }

  // useEffect(() => {
  //   console.log("Mount");
  //   htmlObjects.addEventListener("click", handleOpenModal);

  //   return () => {
  //     console.log("UnMount");
  //     htmlObjects.removeEventListener("click", handleOpenModal);
  //   }
  // }, [])

  const modal = (<Modal element={element}/>);
  // console.log(htmlObjects);
  return (
    <div className={ ingredientStyle.ingredient } onClick={handleOpenModal()}>
      <img className={ ingredientStyle.image } src={ element.image } />
      {/* <Counter count={1} size="default" extraClass="m-1" /> */}
      <div className={`${ingredientStyle.price} mt-2`}>
        <p className="text text_type_digits-default">{ element.price }</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`${ingredientStyle.name} text text_type_main-default mt-2`}>{ element.name }</p>
      
      {state.visible && modal}
    </div>
  );

}

export default Ingredient;