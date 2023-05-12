import React from "react";
import OrderDetailsStyle from './order-details.module.css'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import doneImg from '../../images/done.png'


function OrderDetails() {
  // console.log("OrderDetails")
  return (
    <div className={ OrderDetailsStyle.container }>
      <div style={{ position: 'absolute', top: '25px', right: '25px' }}>
        <CloseIcon type="primary" />
      </div>
      <div className={ OrderDetailsStyle.content }>
        <p className={`${ OrderDetailsStyle.number } text text_type_digits-large mt-30`}>034536</p>
        <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
        <img src={ doneImg } alt="Галочка о совершении заказа"/>
        <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
      </div>
    </div>
  )
}

export default OrderDetails;