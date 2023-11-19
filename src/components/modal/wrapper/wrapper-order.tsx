import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../services/hooks';
import Modal from "../modal";
import OrderPage from "../../../pages/order/order-page";
// import IngredientDetails from "../../ingredient-details/ingredient-details";
// import { getIngredients } from "../../../services/actions/ingredients";

const ModalOrderWrapper = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const parts = pathname.split('/');
    const id = parts[parts.length - 1];
    console.log("ModalOrderWrapper idx", id);

    const handleModalClose = () => {
        navigate(-1);
    };

    const type = pathname.includes('order') ? 'person' : 'all';

    return (
        <Modal onClose={ handleModalClose }>
            <OrderPage type={ type } />
        </Modal>
    )
}

export default ModalOrderWrapper;
