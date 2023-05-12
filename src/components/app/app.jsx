import styles from "./app.module.css";
import { data } from "../../utils/data"; 
import { useState, useEffect } from "react";
import BurgerIngredients from "./../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./../../components/burger-constructor/burger-constructor";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";


function App() {
  const [ingredients, setIngredients] = useState({
    data: []
  })

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('https://norma.nomoreparties.space/api/ingredients')
      const dataFromServer = await res.json()
      setIngredients({ data: dataFromServer.data });
  }
    getData();
  }, [])

  const { data } = ingredients;
  
  return (
    <>
      <AppHeader />
      <main className={ appStyles.app }>
        <BurgerIngredients data={ data } />
        <BurgerConstructor data={ data } />
      </main>
    </>
    );
}

export default App;
