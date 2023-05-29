import React, { useState } from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyle from './../burger-ingredients.module.css'
import Ingredient from './../../ingredient/ingredient';
import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';

function BurgerIngredientsBody({ buns, mains, sauces }) {
  const [state, setState] = useState({ visible: false, data: null });

  const handleOpenModal = (data) => {
    setState({
      visible: true,
      data: data
    });
  }

  const handleCloseModal = () => {
    setState({
      visible: false,
      data: null
    });
  }

  const renderElement = (element) => {
    return <Ingredient
      element={ element }
      key={ element._id }
      openModal={ () => handleOpenModal(element) } 
    />
  };

  return (
    <div 
    className={`${ burgerIngredientsStyle.scroll } custom-scroll`}
    >
      <h3 className='text text_type_main-medium mt-10 mb-6'>Булки</h3>
      <article className={ burgerIngredientsStyle.burger_ingredients }>    
        {buns.map((element) => renderElement(element))}
      </article>

      <h3 className='text text_type_main-medium mt-10 mb-6'>Соусы</h3>
      <article className={ burgerIngredientsStyle.burger_ingredients }>    
        {sauces.map((element) => renderElement(element))}
      </article>

      <h3 className='text text_type_main-medium mt-10 mb-6'>Начинки</h3>
      <article className={ burgerIngredientsStyle.burger_ingredients }>    
        {mains.map((element) => renderElement(element))}
      </article>

      {state.visible &&
        <Modal onClose={ handleCloseModal }>
          <IngredientDetails element={ state.data } onClose={ handleCloseModal } />
        </Modal>
      }
    </div>
  )
}

BurgerIngredientsBody.propTypes = {
  buns: PropTypes.array,
  mains: PropTypes.array,
  sauces: PropTypes.array
}
export default BurgerIngredientsBody;