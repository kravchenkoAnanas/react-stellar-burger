import orderDetailsStyle from './order-details.module.css'
import doneImg from '../../images/done.png'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function OrderDetails() {
  const { orderNumber } = useSelector(state => state);
  
  return (
    <div className={ orderDetailsStyle.container }>
      <div className={ orderDetailsStyle.content }>
        <p className={`${ orderDetailsStyle.number } text text_type_digits-large mt-30`}>
          { orderNumber }
        </p>
        <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
        <img src={ doneImg } alt="Галочка о совершении заказа"/>
        <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
      </div>
    </div>
  )
}

OrderDetails.protoTypes = {
  orderNumber: PropTypes.number
}
export default OrderDetails;