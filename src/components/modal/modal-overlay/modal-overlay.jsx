import modalOverlayStyle from './modal-overlay.module.css'
import PropTypes from 'prop-types';

function ModalOverlay(props) {
  const { onClose } = props;

  return (
    <div className={ modalOverlayStyle.modalOverlay } onClick={ (event) => {
      if (event.target.className.includes("modal")) {
        onClose();
      }
    }} >
      { props.children }
    </div>
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func
}
export default ModalOverlay