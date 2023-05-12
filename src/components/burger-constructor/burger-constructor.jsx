import React, {useState} from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItem from '../constructor-item/constructor-item';
import BurgerConstructorStyle from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

function BurgerConstructor(data) {
  const [state, setState] = useState({ visible: false });

  const elements = data.data;
  const bun = elements.length ? elements.find((element) => element.type === "bun"): null;

  const handleOpenModal = () => {
    setState({ visible: true });
  }

  const handleCloseModal = () => {
    setState({ visible: false });
  }

  const renderBun = (posType) => {
    if (bun !== null) {
      const posWord = posType === 'top' ? 'верх' : 'низ';

      return <ConstructorElement
        type={ posType }
        isLocked={ true }
        text={ bun.name + ` (${posWord})` }
        price={ bun.price }
        thumbnail={ bun.image }
      />
    } else {
      return null;
    }
  };

  return (
    <div>
      <article
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        className='mt-25'
      >
        <div style={{ marginLeft: '35px'}}>
          { renderBun('top') }
        </div>
          {elements.map((element) => (
            element.type !== "bun" &&
              <ConstructorItem element={element} key={element._id}/>
          )
        )}
        <div style={{ marginLeft: '35px'}}>
          { renderBun('bottom') }
        </div>
      </article>
      <div className={ BurgerConstructorStyle.total }>
        <div className={ BurgerConstructorStyle.price }>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary"/>
        </div>
        
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={ () => { handleOpenModal(); } }
        >
          Оформить заказ
        </Button>

        {state.visible &&
          <Modal onClose={ handleCloseModal }>
            <OrderDetails />
          </Modal>
        }
      </div>
    </div>
  )
}

export default BurgerConstructor;