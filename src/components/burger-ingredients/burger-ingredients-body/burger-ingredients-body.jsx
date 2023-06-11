import PropTypes from 'prop-types';
import burgerIngredientsStyle from './../burger-ingredients.module.css'
import Ingredient from './../../ingredient/ingredient';
import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_INGREDIENT, SET_INGREDIENT, UNSET_INGREDIENT, UPD_CURRENT_TAB } from '../../../services/actions';

function BurgerIngredientsBody() {
  const dispatch = useDispatch();

  const { ingredients, ingredientVisible } = useSelector(state => state);

  const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
  const mains = ingredients.filter(ingredient => ingredient.type === 'main');
  const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce');
  
  const handleClickOnIngredient = (element) => {
    if (element.type !== "bun") {
      dispatch({
        type: ADD_INGREDIENT,
        ingredient: element
      })
    }
  };

  const handleOpenModal = (element) => {
    dispatch({
      type: SET_INGREDIENT,
      data: element
    })
  }

  const handleCloseModal = () => {
    dispatch({ type: UNSET_INGREDIENT });
  }

  const renderElement = (element) => {
    return <Ingredient
      element={ element }
      key={ element._id }
      clickCallBack={ () => {
        handleOpenModal(element);
        handleClickOnIngredient(element);
      }} 
    />
  };

  const handlePointerOver = (e) => {
    dispatch({
      type: UPD_CURRENT_TAB,
      scrollTop: e.currentTarget.scrollTop,
      bunsRowsSize: buns.length / 2 * 315,
      sauceRowsSize: sauces.length / 2 * 315,
    })
  }

  return (
    <div 
      className={`${ burgerIngredientsStyle.scroll } custom-scroll`}
      onPointerOver={ handlePointerOver }
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

      {ingredientVisible &&
        <Modal onClose={ handleCloseModal }>
          <IngredientDetails onClose={ handleCloseModal } />
        </Modal>
      }
    </div>
  )
}

export default BurgerIngredientsBody;