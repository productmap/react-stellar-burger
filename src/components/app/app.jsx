import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../utils/api";
import "./app.scss";
import { Ingredients, Cart} from "../../services/appContext";

export default function App() {
  const [appState, setAppState] = useState({
    isLoading: false,
    hasError: false,
  });
  const [apiError, setApiError] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    ingredientsData();
  }, []);

  const ingredientsData = () => {
    setAppState({ hasError: false, isLoading: true });
    getIngredients()
      .then((data) => {
        setAppState({ hasError: false, isLoading: false });
        setIngredients(data.data);
        setCart([
          { id: "643d69a5c3f7b9001cfa093c", uid: uuidv4() },
          { id: "643d69a5c3f7b9001cfa0944", uid: uuidv4() },
          { id: "643d69a5c3f7b9001cfa093f", uid: uuidv4() },
          { id: "643d69a5c3f7b9001cfa0947", uid: uuidv4() },
          { id: "643d69a5c3f7b9001cfa0946", uid: uuidv4() },
          { id: "643d69a5c3f7b9001cfa0946", uid: uuidv4() },
        ]);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
        setApiError(`Ошибка: ${error}`);
        setAppState({ hasError: true, isLoading: false });
      });
  };

  return (
    <div className="app">
      <Ingredients.Provider value={{ ingredients, setIngredients }}>
        <Cart.Provider value={{ cart, setCart }}>
          {appState.isLoading && "Загрузка..."}
          {appState.hasError && "Произошла ошибка"}
          {apiError}
          {!appState.isLoading && !appState.hasError && ingredients.length && (
            <>
              <AppHeader />
              <main className="constructor pb-10">
                <section className="constructor__column">
                  <BurgerIngredients />
                </section>
                <section className="constructor__column pt-25">
                  <BurgerConstructor />
                </section>
              </main>
            </>
          )}
        </Cart.Provider>
      </Ingredients.Provider>
    </div>
  );
}
