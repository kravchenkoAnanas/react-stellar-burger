import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyle from '../burger-ingredients.module.css'
import { useSelector } from 'react-redux';


function BurgerIngredientsHeader() {
  const { currentTab } = useSelector(state => state)

  return (
    <>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <div className={ burgerIngredientsStyle.navigation }>
        <Tab value="Булки" active={currentTab === 'bun'} > Булки </Tab>
        <Tab value="Соусы" active={currentTab === 'sauce'} > Соусы </Tab>
        <Tab value="Начинки" active={currentTab === 'main'}> Начинки </Tab>
      </div>
    </>
  )
}

export default BurgerIngredientsHeader;