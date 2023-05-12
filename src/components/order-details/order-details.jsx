import React from "react";
import OrderDetailsDetailsStyle from './order-details.module.css'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";


function OrderDetails() {
  // console.log("OrderDetails")
  return (
    <div className={ OrderDetailsDetailsStyle.container } >
      <div style={{ position: 'absolute', top: '25px', right: '25px' }}>
        <CloseIcon type="primary" />
      </div>
      <h2 className="text text_type_main-large mt-10 mr-25 ml-10">идентификатор заказа</h2>

    </div>
  )
}

export default OrderDetails;