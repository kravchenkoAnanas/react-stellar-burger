import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { WS_CONNECTION_START } from "../../services/actions/wsActions";
import ProfileNav from "../../components/profile-nav/profile-nav";
import ordersStyle from './orders.module.css';
import Order from "../../components/order/order";
import { getOrdersByStatus } from "../../utils/data";

function OrdersPage() {
  const dispatch = useDispatch();
  const { connected, messages } = useSelector(state => state.ws);
  const feedInfo = messages.length ? messages[messages.length - 1] : { };

  console.log(
    "[WS] connected", connected,
    "messages.length", messages.lengh,
    "feedInfo", feedInfo
  );

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START
    });
  }, []);

  return (
    <>
      <div className={ ordersStyle.main }>
        <ProfileNav />

        <div className={ `${ordersStyle.orderCards} custom-scroll` }>
          {feedInfo && feedInfo.orders && feedInfo.orders.map((info) => {
            return <Order info={ info } add_status={ true } key={ info._id } />
          })}
        </div>
      </div>
    </>
    );
}

export default OrdersPage;
