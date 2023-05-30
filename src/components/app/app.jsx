import { useState, useEffect } from "react";
import BurgerIngredients from "./../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./../../components/burger-constructor/burger-constructor";
import appStyle from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { BurgerContext } from "../../utils/burger-context";


function App() {
  const [ingredients, setIngredients] = useState([]);
  const [chosenIngredients, setChosenIngredients] = useState([]);

  useEffect(() => {
    const getData = async () => {
      fetch('https://norma.nomoreparties.space/api/ingredients')
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`RejectError: ${res.status}`);
        })
        .then((dataFromServer) => {
          setIngredients(dataFromServer.data);
          setChosenIngredients([dataFromServer.data[0]]);
        })
        .catch((error) => {
          console.log(`CatchError: ${error}`)
        })
    }
    getData();
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
