import { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalStyle from './modal.module.css'

const modalRoot = document.getElementById("react-modals");

function Modal(props) {
  const { onClose } = props;
  
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
      <div className={ ModalStyle.modal }>
        { props.children }
      </div>
    ),
    modalRoot
  )
}

export default Modal;