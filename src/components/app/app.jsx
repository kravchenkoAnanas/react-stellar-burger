import { useState, useEffect } from "react";
import BurgerIngredients from "./../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./../../components/burger-constructor/burger-constructor";
import appStyle from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { BurgerContext } from "./../burger-context";


function App() {
  const [ingredients, setIngredients] = useState({
    data: []
  })

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
          setIngredients({ data: dataFromServer.data });
        })
        .catch((error) => {
          console.log(`CatchError: ${error}`)
        })
    }
    getData();
  }, [])

  const { data } = ingredients;
  
  return (
    <>
      <AppHeader />
      <main className={ appStyle.app }>
        <BurgerContext.Provider value={{ data }}>
          <BurgerIngredients />
          <BurgerConstructor />
        </BurgerContext.Provider>
      </main>
    </>
    );
}

export default App;
