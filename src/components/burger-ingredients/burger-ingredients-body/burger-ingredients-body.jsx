import burgerIngredientsStyle from './../burger-ingredients.module.css'
import Ingredient from './../../ingredient/ingredient';
import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { UPD_CURRENT_TAB } from '../../../services/actions/ingredients';
import { ADD_INGREDIENT } from '../../../services/actions/constructor';
import { SET_INGREDIENT, UNSET_INGREDIENT } from '../../../services/actions/ingredient_details_modal';
import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';


function BurgerIngredientsBody() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(state => state.ingredients);
  const { ingredientVisible } = useSelector(state => state.ingredientsDetailModal);
  const currentTab = useSelector(state => state.ingredients.currentTab);

  const [section1Ref, section1InView] = useInView({ threshold: 0.5 });
  const [section2Ref, section2InView] = useInView({ threshold: 0.5 });

  let [buns, mains, sauces] = useMemo(() => {
    const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
    const mains = ingredients.filter(ingredient => ingredient.type === 'main');
    const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce');

    return [buns, mains, sauces]
  }, [ingredients]);

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
      }} 
    />
  };

  useMemo(() => {
    dispatch({
      type: UPD_CURRENT_TAB,
      isSection1: section1InView,
      isSection2: section2InView
    })
  }, [section1InView, section2InView]);

  return (
    <>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <div className={ burgerIngredientsStyle.navigation }>
        <Tab value="Булки" active={currentTab === 'bun'} > Булки </Tab>
        <Tab value="Соусы" active={currentTab === 'sauce'} > Соусы </Tab>
        <Tab value="Начинки" active={currentTab === 'main'}> Начинки </Tab>
      </div>

      <div className={`${ burgerIngredientsStyle.scroll } custom-scroll`} >
        <h3 className='text text_type_main-medium mt-10 mb-6'>Булки</h3>
        <article className={ burgerIngredientsStyle.burger_ingredients } ref={section1Ref} >
          {buns.map((element) => renderElement(element))}
        </article>

        <h3 className='text text_type_main-medium mt-10 mb-6'>Соусы</h3>
        <article className={ burgerIngredientsStyle.burger_ingredients } ref={section2Ref}>
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
    </>
  )
}

export default BurgerIngredientsBody;