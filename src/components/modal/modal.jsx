import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import modalStyle from './modal.module.css'
import PropTypes from 'prop-types';

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
      <div className={ modalStyle.modal }>
        <div className={ modalStyle.submodal }>
          { props.children }
          <div className={ modalStyle.icon }>
            <CloseIcon type="primary" onClick={ () => {
              onClose();
            }}/>
          </div>
        </div>
      </div>
    ),
    modalRoot
  )
}

Modal.propTypes = {
  onClose: PropTypes.func
}
export default Modal;