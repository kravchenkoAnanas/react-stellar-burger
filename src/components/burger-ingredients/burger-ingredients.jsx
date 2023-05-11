import React from 'react';
import { ConstructorElement, Counter, CurrencyIcon, Tab, Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css'
import Ingredient from '../ingridient/ingridient';
import { element } from 'prop-types';
// import CustomScroll from 'react-custom-scroll';


function BurgerIngredients(data) {
  const [current, setCurrent] = React.useState('Булки')

  const elements = data.data;

  const buns = elements.filter(element => element.type === 'bun');
  const mains = elements.filter(element => element.type === 'main');
  const sauces = elements.filter(element => element.type === 'sauce');

  const element = mains[0];

  return (
    <div>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <div style={{ display: 'flex' }}>
        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
            Булки
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
            Соусы
        </Tab>
        <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
            Начинки
        </Tab>
      </div>

      <h3 className='text text_type_main-medium mt-10 mb-6'>Булки</h3>
      <article className={ burgerIngredientsStyles.burger_ingredients }>    
        {buns.map((element) =>
          <Ingredient element={element} />
        )}
      </article>

      <h3 className='text text_type_main-medium mt-10 mb-6'>Соусы</h3>
      <article className={ burgerIngredientsStyles.burger_ingredients }>    
        {sauces.map((element) =>
          <Ingredient element={element} />
        )}
      </article>

      <h3 className='text text_type_main-medium mt-10 mb-6'>Начинки</h3>
      <article className={ burgerIngredientsStyles.burger_ingredients }>    
        {mains.map((element) =>
          <Ingredient element={element} />
        )}
      </article>
      
      {/* <Modal element={element} /> */}
      </div>
  ) 
}

export default BurgerIngredients;




/* <article className={`${burgerIngredientsStyles.   } mt-25 ml-5`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        {elements.map((element) => (
            element.type === "bun" &&

              <ConstructorElement
                text={ element.name }
                price={ element.price }
                thumbnail={ element.image }
              />
          )
        )}
        </div>
      </article> */