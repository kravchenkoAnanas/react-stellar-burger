import burgerIngredientsStyle from './../burger-ingredients.module.css'
import Ingredient from '../../ingredient/ingredient';
import { useSelector, useDispatch } from './../../../services/hooks';
import { UPD_CURRENT_TAB } from '../../../services/actions/ingredients';
import { SET_INGREDIENT } from '../../../services/actions/ingredient_details_modal';
import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { IIngredint } from '../../../services/types';


function BurgerIngredientsBody() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ingredients } = useSelector(state => state.ingredients);
  const currentTab = useSelector(state => state.ingredients.currentTab);

  const [section1Ref, section1InView] = useInView({ threshold: 0.5 });
  const [section2Ref, section2InView] = useInView({ threshold: 0.5 });

  let [buns, mains, sauces] = useMemo(() => {
    const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
    const mains = ingredients.filter(ingredient => ingredient.type === 'main');
    const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce');

    return [buns, mains, sauces]
  }, [ingredients]);

  const handleOpenModal = (element: IIngredint) => {
    dispatch({
      type: SET_INGREDIENT,
      data: element
    })
    navigate('/')
  }

  const renderElement = (element: IIngredint) => {
    return (
      <Ingredient
        element={ element }
        key={ element._id }
        clickCallBack={ () => {
          handleOpenModal(element);
        }} 
      />
    )
  };

  useMemo(() => {
    dispatch({
      type: UPD_CURRENT_TAB,
      isSection1: section1InView,
      isSection2: section2InView
    })
  }, [section1InView, section2InView]);

  const handleTabClick = (value: string) => { };

  return (
    <>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <div className={ burgerIngredientsStyle.navigation }>
        <Tab value="Булки" active={currentTab === 'bun'} onClick={handleTabClick}> Булки </Tab>
        <Tab value="Соусы" active={currentTab === 'sauce'} onClick={handleTabClick}> Соусы </Tab>
        <Tab value="Начинки" active={currentTab === 'main'} onClick={handleTabClick}> Начинки </Tab>
      </div>

      <div className={`${ burgerIngredientsStyle.scroll } custom-scroll`} >
        <h3 className='text text_type_main-medium mt-10 mb-6'>Булки</h3>
        <article className={ burgerIngredientsStyle.burger_ingredients } ref={section1Ref} >
          {buns.map(element => renderElement(element))}
        </article>

        <h3 className='text text_type_main-medium mt-10 mb-6'>Соусы</h3>
        <article className={ burgerIngredientsStyle.burger_ingredients } ref={section2Ref}>
          {sauces.map(element => renderElement(element))}
        </article>

        <h3 className='text text_type_main-medium mt-10 mb-6'>Начинки</h3>
        <article className={ burgerIngredientsStyle.burger_ingredients }>    
          {mains.map(element => renderElement(element))}
        </article>
      </div>
    </>
  )
}

export default BurgerIngredientsBody;