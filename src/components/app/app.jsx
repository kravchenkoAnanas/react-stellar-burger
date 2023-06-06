import { useState, useEffect } from "react";
import BurgerIngredients from "./../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./../../components/burger-constructor/burger-constructor";
import appStyle from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { BurgerContext } from "../../utils/burger-context";
import { getData } from '../../services/api'


function App() {
  const [ingredients, setIngredients] = useState([]);
  const [chosenIngredients, setChosenIngredients] = useState([]);

  useEffect(() => {
    getData(setIngredients, setChosenIngredients);
  }, [])

  return (
    <>
      <AppHeader />
      <main className={ appStyle.app }>
        <BurgerContext.Provider value={{ chosenIngredients, setChosenIngredients }}>
          <BurgerIngredients ingredients={ ingredients }/>
          <BurgerConstructor />
        </BurgerContext.Provider>
      </main>
    </>
    );
}

export default App;
