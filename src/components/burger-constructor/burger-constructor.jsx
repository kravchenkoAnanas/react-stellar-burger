import React from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItem from '../constructor-item/constructor-item';
import BurgerConstructorStyle from './burger-constructor.module.css'


function BurgerConstructor(data) {
  
  const elements = data.data;
  const bun = elements[4];

  return (
    <div>
      <article style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className='mt-25'>
        <div style={{ marginLeft: '35px'}}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={ bun.name + ' (верх)' }
            price={ bun.price }
            thumbnail={ bun.image }
          />
        </div>
          {elements.map((element) => (
            element.type !== "bun" &&
              <ConstructorItem element={element} key={element._id}/>
          )
        )}
        <div style={{ marginLeft: '35px'}}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={ bun.name + ' (низ)' }
            price={ bun.price }
            thumbnail= { bun.image }
          />
        </div>
      </article>
      <div className={ BurgerConstructorStyle.total }>
        <div className={ BurgerConstructorStyle.price }>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary"/>
        </div>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

export default BurgerConstructor;