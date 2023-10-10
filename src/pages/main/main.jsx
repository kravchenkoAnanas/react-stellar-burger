import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import mainStyle from "./main.module.css";
import Header from "../../components/header/header";
import { getIngredients } from '../../services/actions/ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <Header />
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
