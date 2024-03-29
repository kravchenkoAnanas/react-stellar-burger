import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import mainStyle from "./main.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function MainPage() {
    return (
        <>
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
