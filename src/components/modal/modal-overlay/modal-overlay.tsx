import { FC, ReactNode } from "react";
import modalOverlayStyle from './modal-overlay.module.css'

interface ModalOverlayProps {
  onClose: () => void;
  children: ReactNode;
}

const ModalOverlay: FC<ModalOverlayProps> = (props) => {
  const { onClose } = props;

  const onClickFunc = (e: React.FormEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).className.includes("modal")) {
      onClose();
    }
  }

  return (
    <div
      className={ modalOverlayStyle.modalOverlay }
      onClick={ onClickFunc }
    >
      { props.children }
    </div>
  )
}

export default ModalOverlay