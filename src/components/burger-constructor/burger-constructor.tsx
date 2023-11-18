import { FC, useState, useMemo } from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItem from '../constructor-item/constructor-item';
import burgerConstructorStyle from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { useSelector, useDispatch } from './../../services/hooks';
import { sendOrder, CLOSE_ORDER } from '../../services/actions/order';
import { ADD_INGREDIENT } from '../../services/actions/constructor';
import { UPD_INGREDIENTS } from '../../services/actions/ingredients';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../services/types';
import { IIngredint } from '../../services/types';

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderVisible } = useSelector((state: RootState) => state.order);
  const { chosenIngredients } = useSelector((state: RootState) => state.burgerConstructor);
  const { user } = useSelector((state: RootState) => state.user);
  const [sum, setSum] = useState<number>(0);

  const [{ isHover }, drop] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(item: { element: IIngredint }) {
      dispatch({
        type: ADD_INGREDIENT,
        ingredient: item.element
      });
      dispatch({
        type: UPD_INGREDIENTS,
        ingredientIds: chosenIngredients.map((ingredient: IIngredint) => {
          return ingredient._id;
        }).concat([item.element._id])
      });
    }
  });

  let bun: IIngredint | null | undefined = chosenIngredients.length
    ? chosenIngredients.find((element: IIngredint) => element.type === "bun")
    : null;
  bun = bun === undefined ? null : bun;

  const handleOpenModal = () => {
    // console.log("handleOpenModal user", user);
    const ids = chosenIngredients.map((ingredient: IIngredint) => {
      return ingredient._id;
    });
    if (user) {
      dispatch(sendOrder(ids));
    } else {
      navigate("/login");
    }
  }

  const handleCloseModal = () => {
    dispatch({
      type: CLOSE_ORDER,
    });
  }

  const renderBun = (posType: "top" | "bottom") => {
    if (bun !== null) {
      const posWord = posType === 'top' ? 'верх' : 'низ';

      return <ConstructorElement
        type={posType}
        isLocked={true}
        text={bun?.name + ` (${posWord})`}
        price={bun?.price || 0}
        thumbnail={bun?.image || ""}
      />
    } else {
      return null;
    }
  };

  const sumArrayOfIngredients = (arr: IIngredint[]) => {
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
    <div ref={drop}>
      <article
        className={ burgerConstructorStyle.burger_constructor }
      >
        <div className={ burgerConstructorStyle.bun }>
          { renderBun('top') }
        </div>
        <div
          className={`${ burgerConstructorStyle.scroll } custom-scroll`}
        >
          {chosenIngredients.map((ingredient: IIngredint, i: number) => (
            ingredient.type !== "bun" &&
              <ConstructorItem index={i} element={ingredient} key={ingredient.uuid}/>
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

export default BurgerConstructor;