import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { WS_CONNECTION_START } from "../../services/actions/wsActions";

function OrdersPage() {
  const today = new Date();
  const dispatch = useDispatch();

  const { connected, messages } = useSelector(state => state.ws);
  const feedInfo = messages[0] || { };

  console.log(
    "[WS] connected", connected,
    "messages.length", messages.length,
    "feedInfo", feedInfo
  );
  
  if (feedInfo && feedInfo.orders) {
    console.log("Order", feedInfo.orders[0]);
    const {
      createdAt, ingredients, name, number, status, updatedAt, _id
    } = feedInfo.orders[0];
    console.log("createdAt, ingredients, name, number, status, updatedAt, _id",
      createdAt, ingredients, name, number, status, updatedAt, _id)
  }

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
  }, []);

  return (
    <h1 align='center'>OrdersPage</h1>
  );
}

export default OrdersPage;
