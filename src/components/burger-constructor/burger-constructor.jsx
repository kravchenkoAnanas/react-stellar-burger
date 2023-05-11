import React from 'react';
import { ConstructorElement, CurrencyIcon, LockIcon, DragIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItem from '../constructor-item/constructor-item';


function BurgerConstructor(data) {
  
  const elements = data.data;
  const bun = elements[0];

  return (
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
            <ConstructorItem element={element}/>
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
  )
}

export default BurgerConstructor;