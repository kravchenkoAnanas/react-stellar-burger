import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyle from '../burger-ingredients.module.css'


function BurgerIngredientsHeader({ current, setCurrent }) {
  return (
    <>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <div className={ burgerIngredientsStyle.navigation }>
        <Tab value="Булки" active={current === 'Булки'} onClick={ setCurrent }>
            Булки
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={ setCurrent }>
            Соусы
        </Tab>
        <Tab value="Начинки" active={current === 'Начинки'} onClick={ setCurrent }>
            Начинки
        </Tab>
      </div>
    </>
  )
}

export default BurgerIngredientsHeader;