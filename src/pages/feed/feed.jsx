import feedStyle from './feed.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { WS_CONNECTION_START } from "../../services/actions/wsActions";
import Order from "../../components/order/order";

function FeedPage() {
  const dispatch = useDispatch();

  const { connected, messages } = useSelector(state => state.ws);
  const feedInfo = messages.length ? messages[messages.length - 1] : { };

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
      createdAt, ingredients, name, number, status, updatedAt, _id
    )
    console.log("new Date(updatedAt)", new Date(updatedAt));
  }

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: '/all'
    });
  }, []);

  return (
    <>
      <div className={ feedStyle.feed }>
        <div className={ feedStyle.feed_left }>
          <h2 className="text text_type_main-large mt-10">Лента заказов</h2>
          <div className={ feedStyle.orders }>
            {feedInfo && feedInfo.orders && feedInfo.orders.map((info) => {
              return <Order info={ info } key={ info._id } />
            })
            }
          </div>
        </div>
        <div className={ feedStyle.feed_right }>
          <div className={ feedStyle.order_numbers }>
            <div>
            <p className="text text_type_main-medium">Готовы:</p>
            <div className={ feedStyle.order_numbers_left }>
              <p className="text text_type_digits-default">056789</p>
              <p className="text text_type_digits-default">056788</p>
              <p className="text text_type_digits-default">056787</p>
              <p className="text text_type_digits-default">056786</p>
              <p className="text text_type_digits-default">056785</p>
            </div>
            </div>
            <div>
            <p className="text text_type_main-medium">В работе:</p>
            <div className={ feedStyle.order_numbers_right }>
              <p className="text text_type_digits-default">056789</p>
              <p className="text text_type_digits-default">056788</p>
              <p className="text text_type_digits-default">056787</p>
            </div>
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className={`${ feedStyle.numbers } text text_type_digits-large`}>29 756</p>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={`${ feedStyle.numbers } text text_type_digits-large`}>140</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedPage;