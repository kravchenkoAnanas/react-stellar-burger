import PropTypes from 'prop-types';
import burgerIngredientsStyle from './../burger-ingredients.module.css'
import Ingredient from './../../ingredient/ingredient';
import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_INGREDIENT, SET_INGREDIENT, UNSET_INGREDIENT } from '../../../services/actions';

function BurgerIngredientsBody({ buns, mains, sauces }) {
  const dispatch = useDispatch();

  const { ingredientVisible } = useSelector(state => state);

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

      {ingredientVisible &&
        <Modal onClose={ handleCloseModal }>
          <IngredientDetails onClose={ handleCloseModal } />
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