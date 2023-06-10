import { useState, useMemo} from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItem from '../constructor-item/constructor-item';
import burgerConstructorStyle from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { sendOrder, CLOSE_ORDER } from '../../services/actions/index';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { orderVisible, orderNumber, chosenIngredients } = useSelector(state => state);
  
  const [sum, setSum] = useState(0);
  
  const bun = chosenIngredients.length
    ? chosenIngredients.find((element) => element.type === "bun")
    : null;

  const handleOpenModal = () => {
    const ids = chosenIngredients.map((ingredient) => {
      return ingredient._id;
    });
    dispatch(sendOrder(ids));
  }

  const handleCloseModal = () => {
    dispatch({
      type: CLOSE_ORDER,
    });
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

  const sumArrayOfIngredients = (arr) => {
    let sum = 0;

    for (let i = 0; i < arr.length; i = i + 1) {
      sum = sum + arr[i].price;
    }
    return sum;
  }

  const calculateSum = () => {
    if (chosenIngredients === null || chosenIngredients.length === 0) {
      return 0;
    }
    return chosenIngredients[0].price * 2 + sumArrayOfIngredients(chosenIngredients.slice(1));
  }

  useMemo(() => {
    const newSum = calculateSum();
    setSum(newSum);
  }, [chosenIngredients])

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
          {chosenIngredients.map((ingredient) => (
            ingredient.type !== "bun" &&
              <ConstructorItem element={ingredient} key={ingredient._id}/>
          )
        )}
        </div>
        <div className={ burgerConstructorStyle.bun }>
          { renderBun('bottom') }
        </div>
      </article>
      <div className={ burgerConstructorStyle.total }>
        <div className={ burgerConstructorStyle.price }>
          <p className="text text_type_digits-medium">{ sum }</p>
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

        {orderVisible &&
          <Modal onClose={ handleCloseModal }>
            <OrderDetails />
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