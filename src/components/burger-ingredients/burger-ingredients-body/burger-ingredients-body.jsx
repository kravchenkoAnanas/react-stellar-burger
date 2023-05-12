import React, { useState } from 'react';

import burgerIngredientsStyles from './../burger-ingredients.module.css'
import Ingredient from './../../ingredient/ingredient';
import Modal from '../../modal/modal';


function BurgerIngredientsBody({ buns, mains, sauces}) {
  const [state, setState] = useState({ visible: false, data: null });

  const handleOpenModal = (data) => {
    console.log("handleOpenModal")
    setState({
      visible: true,
      data: data
    });
  }

  const handleCloseModal = () => {
    console.log("handleCloseModal")
    setState({
      visible: false,
      data: null
    });
  }

  const renderElement = (element) => {
    return <Ingredient
      element={element}
      key={element._id}
      openModal={ () => handleOpenModal(element) } 
    />
  };

  return (
    <>
      <h3 className='text text_type_main-medium mt-10 mb-6'>Булки</h3>
      <article className={ burgerIngredientsStyles.burger_ingredients }>    
        {buns.map((element) => renderElement(element))}
      </article>

      <h3 className='text text_type_main-medium mt-10 mb-6'>Соусы</h3>
      <article className={ burgerIngredientsStyles.burger_ingredients }>    
        {sauces.map((element) => renderElement(element))}
      </article>

      <h3 className='text text_type_main-medium mt-10 mb-6'>Начинки</h3>
      <article className={ burgerIngredientsStyles.burger_ingredients }>    
        {mains.map((element) => renderElement(element))}
      </article>

      {state.visible && <Modal element={ state.data } onClose={ handleCloseModal } />}
    </>
  )
}

export default BurgerIngredientsBody;