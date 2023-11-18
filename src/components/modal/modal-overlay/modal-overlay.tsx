import { FC, ReactNode } from "react";
import modalOverlayStyle from './modal-overlay.module.css'

interface ModalOverlayProps {
  onClose: () => void;
  children: ReactNode;
}

const ModalOverlay: FC<ModalOverlayProps> = (props) => {
  const { onClose } = props;

  return (
    <div className={ modalOverlayStyle.modalOverlay } onClick={ (event: any) => {
      if (event.target.className.includes("modal")) {
        onClose();
      }
    }} >
      { props.children }
    </div>
  )
}

export default ModalOverlay