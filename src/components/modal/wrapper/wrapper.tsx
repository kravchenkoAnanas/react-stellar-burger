import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import IngredientDetails from "../../ingredient-details/ingredient-details";
import Modal from "../modal";
import { UNSET_INGREDIENT } from "../../../services/actions/ingredient_details_modal";
import { getIngredients } from "../../../services/actions/ingredients";

const ModalWrapper = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    
    const parts = pathname.split('/');
    const id = parts[parts.length - 1];
    // console.log("IngredientPage idx", id);

    useEffect(() => {
        dispatch(getIngredients(id));
    }, []);
    
    const handleModalClose = () => {
        navigate(-1);
        dispatch({ type: UNSET_INGREDIENT });
    };

    return (
        <Modal onClose={ handleModalClose }>
            <IngredientDetails />
        </Modal>
    )
}

export default ModalWrapper;
