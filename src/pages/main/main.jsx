import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import mainStyle from "./main.module.css";
import Header from "../../components/header/header";
import { getIngredients } from '../../services/actions/ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getCookie } from "../../utils/cookie";


function MainPage() {
    const dispatch = useDispatch();
    const { accessToken } = localStorage.getItem("accessToken");
    const { refreshToken } = localStorage.getItem("refreshToken");

    useEffect(() => {
        dispatch(getIngredients());
    }, []);

    return (
        <>
            <Header />

            <h3> accessToken { accessToken }</h3>
            <h3> refreshToken { refreshToken }</h3>

            <DndProvider backend={HTML5Backend}>
            <main className={ mainStyle.main }>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
            </DndProvider>
        </>
    );
}

export default MainPage;
