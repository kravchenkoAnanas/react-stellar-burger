import { FC, ReactNode, useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import modalStyle from './modal.module.css'
import ModalOverlay from "./modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = (props) => {
  const { onClose } = props;
  
  useEffect(() => {
    const closeModal = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", closeModal);

    return () => {
      document.removeEventListener("keydown", closeModal);
    }
  })

  return modalRoot
    ? ReactDOM.createPortal(
      <ModalOverlay onClose={ onClose } >
        <div className={ modalStyle.modal }>
            { props.children }
            <button className={ modalStyle.icon }>
              <div onClick={ (event) => {
                  event.stopPropagation();
                  onClose();
                } }>
                <CloseIcon type="primary" />
              </div>
            </button>
          </div>
      </ModalOverlay>,
      modalRoot)
    : null
}

export default Modal;