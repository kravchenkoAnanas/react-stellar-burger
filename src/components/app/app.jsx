import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import BurgerIngredients from "./../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./../../components/burger-constructor/burger-constructor";
import appStyle from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { getIngredients } from './../../services/actions/index';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={ appStyle.app }>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
    );
}

export default App;
