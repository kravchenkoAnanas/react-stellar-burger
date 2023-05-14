import React, {useState} from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItem from '../constructor-item/constructor-item';
import burgerConstructorStyle from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';

function BurgerConstructor(props) {
  const [state, setState] = useState({ visible: false });

  const elements = props.data;
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
        className={ burgerConstructorStyle.burger_constructor }
      >
        <div className={ burgerConstructorStyle.bun }>
          { renderBun('top') }
        </div>
        <div
          className={`${ burgerConstructorStyle.scroll } custom-scroll`}
        >
          {elements.map((element) => (
            element.type !== "bun" &&
              <ConstructorItem element={element} key={element._id}/>
          )
        )}
        </div>
        <div className={ burgerConstructorStyle.bun }>
          { renderBun('bottom') }
        </div>
      </article>
      <div className={ burgerConstructorStyle.total }>
        <div className={ burgerConstructorStyle.price }>
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
            <OrderDetails onClose={ handleCloseModal } />
          </Modal>
        }
      </div>
    </div>
  )
}

BurgerConstructor.protoTypes = {
  data: PropTypes.array
}
export default BurgerConstructor;