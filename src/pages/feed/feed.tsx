import feedStyle from './feed.module.css'
import { useSelector, useDispatch } from './../../services/hooks';
import { useEffect } from "react";
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from "../../services/actions/wsActions";
import Order from "../../components/order/order";
import { IMessage, IOrder } from '../../services/types';

const getOrdersByStatus = (feedInfo: IMessage, status: 'pending' | 'done') => {
  if (feedInfo && feedInfo.orders) {
    const filteredOrders = feedInfo.orders.filter(order => {
      return order.status == status;
    });
    return filteredOrders;
  }
  return [];
};

function FeedPage() {
  const dispatch = useDispatch();
  const { connected, messages } = useSelector(state => state.ws);
  const feedInfo = messages.length 
    ? messages[messages.length - 1]
    : { total: "", totalToday: "", orders: [] };
  // const total = feedInfo ? feedInfo.total : "";
  // const totalToday = feedInfo ? feedInfo.totalToday : "";
  const inProgressOrders = getOrdersByStatus(feedInfo as IMessage, "pending");
  const readyOrders = getOrdersByStatus(feedInfo as IMessage, "done");

  // console.log(
  //   "[WS] connected", connected,
  //   "messages.length", messages.length,
  //   "feedInfo", feedInfo
  // );

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: '/all'
    });
    return () => {
      // console.log("FeedPage type: WS_CONNECTION_CLOSE")
      dispatch({
        type: WS_CONNECTION_CLOSE,
      });
    };
  }, []);

  return (
    <>
      <div className={ feedStyle.feed }>
        <div className={ feedStyle.feed_left }>
          <h2 className="text text_type_main-large mt-10">Лента заказов</h2>
          <div className={ `${feedStyle.orderCards} custom-scroll` }>
            {feedInfo && feedInfo.orders && feedInfo.orders.map(info => {
              return <Order info={ info } add_status={ false } key={ info._id } />
            })}
          </div>
        </div>
        <div className={ feedStyle.feed_right }>
          <div className={ feedStyle.order_numbers }>
            <div>
              <p className="text text_type_main-medium">Готовы:</p>
              <div className={ feedStyle.indexes }>
                <div className={ `${feedStyle.orders} ${feedStyle.ready_orders}`}>
                  {readyOrders.slice(0, 10).map((order, i) => {
                    return <p className="text text_type_digits-default" key={ i }  >{ order.number }</p>
                  })}
                </div>
                <div className={ `${feedStyle.orders} ${feedStyle.ready_orders}` }>
                  {readyOrders.slice(10, 20).map((order, i) => {
                    return <p className="text text_type_digits-default" key={ i } >{ order.number } </p>
                  })}
                </div>
              </div>
            </div>
            <div>
              <p className="text text_type_main-medium">В работе:</p>
              <div className={ feedStyle.indexes }>
                <div className={ feedStyle.orders }>
                  {inProgressOrders.slice(0, 10).map(order => {
                    return <p className="text text_type_digits-default">{ order.number }</p>
                  })}
                </div>
                <div className={ feedStyle.orders }>
                  {inProgressOrders.slice(10, 20).map(order => {
                    return <p className="text text_type_digits-default">{ order.number }</p>
                  })}
                </div>
              </div>
            </div>
          </div>
        <div>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className={`${ feedStyle.numbers } text text_type_digits-large`}>
              { feedInfo.total }
            </p>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={`${ feedStyle.numbers } text text_type_digits-large`}>
              { feedInfo.totalToday }
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedPage;