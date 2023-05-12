import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function ConstructorItem({element}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '13px', alignItems: "center" }}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={ element.name }
        price={ element.price }
        thumbnail={ element.image }
        />
    </div>
  )
}

export default ConstructorItem;