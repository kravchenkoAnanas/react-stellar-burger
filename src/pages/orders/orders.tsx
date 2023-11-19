import { useSelector, useDispatch } from './../../services/hooks';
import { useEffect } from "react";
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from "../../services/actions/wsActions";
import ProfileNav from "../../components/profile-nav/profile-nav";
import ordersStyle from './orders.module.css';
import Order from "../../components/order/order";
import { IOrder } from '../../services/types';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { connected, messages } = useSelector(state => state.ws);
  const feedInfo = messages.length ? messages[messages.length - 1] : { orders: []};

  // console.log(
  //   "[WS] connected", connected,
  //   "messages.length", messages.lengh,
  //   "feedInfo", feedInfo
  // );

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START
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
      <div className={ ordersStyle.main }>
        <ProfileNav type={ "orders" }/>

        <div className={ `${ordersStyle.orderCards} custom-scroll` }>
          {feedInfo && feedInfo.orders && feedInfo.orders.map(info => {
            return <Order info={ info } add_status={ true } key={ info._id } />
          })}
        </div>
      </div>
    </>
    );
}

export default OrdersPage;
