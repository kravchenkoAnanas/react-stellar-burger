import { useParams } from 'react-router-dom';
import orderStyle from './order-page.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from './../../services/hooks';
import { useEffect } from 'react';
import { WS_CONNECTION_START } from '../../services/actions/wsActions';
import { getIngredient, getStatus, totalSum } from "../../utils/data";
import { IIngredint, IMessage, IOrder } from '../../services/types';


const getOrder = (feedInfo: IMessage, number: string) => {
  if (feedInfo && feedInfo.orders) {
    const filteredOrders = feedInfo.orders.filter(order => {
      return order.number === Number(number)
    });
    if (filteredOrders.length) {
      return filteredOrders[0];
    }
  }
};

function OrderPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { connected, messages } = useSelector(state => state.ws);
  const { ingredients } = useSelector(state => state.ingredients);
  const feedInfo = messages.length ? messages[messages.length - 1] : { };

  // console.log(
  //   "[WS] connected", connected,
  //   "messages.length", messages.lengh,
  //   "feedInfo", feedInfo
  // );

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START
    });
  }, []);

  const info = getOrder(feedInfo as IMessage, id as string);
  // console.log("info", info);
  if (!info) {
    return <></>
  }

  const orderIngredientsIdxs = info.ingredients;
  const formattedDate = new Date(info.createdAt);
  const orderIngredients = orderIngredientsIdxs.map(id => {
    return getIngredient(ingredients, id);
  });
  const price = totalSum((orderIngredients as IIngredint[]));
  const [status, statusStyle] = getStatus(info);

  return (
    <>
      <div className={ orderStyle.order }>
        <div className={ orderStyle.info }>
          <p className={`${ orderStyle.number } text text_type_digits-default mb-10`}>
            #{info.number}
          </p> 
          <p className="text text_type_main-medium mb-3">
            {info.name}
          </p>
          <p className={`${statusStyle} text text_type_main-small mb-15`}>
            { status }
          </p>
          <p className="text text_type_main-medium mb-6">Состав:</p>
        </div>
        <div
          className={ `${orderStyle.consist} custom-scroll` }
        >
          {(orderIngredients as IIngredint[]).map(ingredient => {
            return (
              <div className={ orderStyle.ingredient } key={ ingredient._id } >
                <div className={ orderStyle.left }>
                  <div className={ orderStyle.imageWrapper }>
                    <img
                      src={ ingredient.image }
                      alt={ ingredient.name }
                      className={ orderStyle.image }
                      />
                  </div> 
                  <p className={`${ orderStyle.text } text text_type_main-small`}>
                    { ingredient.name }
                  </p>
                </div>
                <div className={ orderStyle.sum }>
                  <p className="text text_type_digits-default">
                    1 x {ingredient.price}
                  </p>
                  <CurrencyIcon type="primary"/>
                </div>
              </div>
            )
          })}
        </div>
        <div className={ orderStyle.total }>
          <FormattedDate
            date={ formattedDate }
            className="text text_type_main-default text_color_inactive"
          />
          <div className={ orderStyle.sum }>
            <p className="text text_type_digits-default">
              { price }
            </p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderPage;
