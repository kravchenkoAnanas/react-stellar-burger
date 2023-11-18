import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyle from '../burger-ingredients.module.css'
// import { useSelector } from 'react-redux';
import { useSelector, useDispatch } from './../../../services/hooks';


function BurgerIngredientsHeader() {
  const currentTab = useSelector((state: any) => state.ingredients.currentTab);
  const handleTabClick = (value: string) => { };

  return (
    <>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <div className={ burgerIngredientsStyle.navigation }>
        <Tab value="Булки" active={currentTab === 'bun'} onClick={handleTabClick} > Булки </Tab>
        <Tab value="Соусы" active={currentTab === 'sauce'} onClick={handleTabClick} > Соусы </Tab>
        <Tab value="Начинки" active={currentTab === 'main'} onClick={handleTabClick} > Начинки </Tab>
      </div>
    </>
  )
}

export default BurgerIngredientsHeader;