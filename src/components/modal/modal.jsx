import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import ModalStyle from './modal.module.css'
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

const modalRoot = document.getElementById("react-modals");

function Modal({element, onClose}) {
  useEffect(() => {
    const closeModal = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", closeModal);

    return () => {
      document.removeEventListener("keydown", closeModal);
    }
  })

  return ReactDOM.createPortal(
    (
      <div className={ ModalStyle.modal } onClick={ () => { 
          console.log("click2close");
          onClose();
        }}
      >
        <OrderDetails />
      </div>
    ),
    modalRoot
  )
}

// TODO
// <IngredientDetails element={ element } />

export default Modal;