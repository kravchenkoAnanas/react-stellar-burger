import React from "react";
import ModalStyle from './modal.module.css'
import IngredientDetails from "../ingredient-details/ingredient-details";

const modalRoot = document.getElementById("react-modals");

function Modal({element}) {
  console.log("Modal")
  return ReactDOM.createPortal(
    (
      <div className={ModalStyle.modal}>
        <IngredientDetails element={ element }/>
      </div>
    ),
    modalRoot
  )
}

export default Modal;