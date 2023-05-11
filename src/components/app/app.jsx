import styles from "./app.module.css";
import { data } from "../../utils/data"; 
import { useState, useEffect } from "react";
import BurgerIngredients from "./../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./../../components/burger-constructor/burger-constructor";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";


function App() {
  const [ingredients, setIngredients] = useState({
    data: null
  })
  
  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await fetch('https://norma.nomoreparties.space/api/ingredients')
  //     const dataFromServer = await res.json()
  //     console.log(dataFromServer);
  //     setIngredients({ data: dataFromServer.data });
  // }
  //   getData();
  // }, [])
  
  // ingredients = {data: Array(15)}
  // const { data } = ingredients;
  
  
  return (
    <>
      <AppHeader />
      <main className={appStyles.app}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </>
    );
}

export default App;

// calories:  420
// carbohydrates:  53
// fat:  24
// image:  "https://code.s3.yandex.net/react/code/bun-02.png"
// image_large:  "https://code.s3.yandex.net/react/code/bun-02-large.png"
// image_mobile:  "https://code.s3.yandex.net/react/code/bun-02-mobile.png"
// name:  "Краторная булка N-200i"
// price:  1255
// proteins :  80
// type :  "bun"