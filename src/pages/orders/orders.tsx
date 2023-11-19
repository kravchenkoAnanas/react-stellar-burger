import { useSelector, useDispatch } from './../../services/hooks';
import { useEffect } from "react";
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from "../../services/actions/wsActions";
import ProfileNav from "../../components/profile-nav/profile-nav";
import ordersStyle from './orders.module.css';
import Order from "../../components/order/order";
import { Link, useLocation } from 'react-router-dom';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
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
            return (
              <Link
                key={ info._id }
                to={ `/profile/orders/${info._id}` }
                state={{ background: location }}
                className={ ordersStyle.link }
              >
                <Order info={ info } add_status={ true } key={ info._id } />
              </Link>
              )
          })}
        </div>
      </div>
    </>
    );
}

export default OrdersPage;
