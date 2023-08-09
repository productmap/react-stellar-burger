import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../utils/api";
import "./app.scss";
import { Ingredients, Cart } from "../../services/appContext";

export default function App() {
  const [appState, setAppState] = useState({
    isLoading: false,
    hasError: false,
  });
  const [apiError, setApiError] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setAppState({ hasError: false, isLoading: true });
    getIngredients()
      .then((data) => {
        setAppState({ hasError: false, isLoading: false });
        setIngredients(data.data);
        const bun = data.data.find((el) => el.type === "bun");
        const ingredients = data.data.filter((el) => el.type !== "bun");
        const burgerIngredients = ingredients.map((el) => ({
          ...el,
          key: uuid(),
        }));
        const burger = [
          { ...bun, key: uuid() },
          ...burgerIngredients,
          { ...bun, key: uuid() },
        ];
        setCart(burger);
      })
      .catch((error) => {
        setApiError(`Ошибка: ${error}`);
        setAppState({ hasError: true, isLoading: false });
      });
  }, []);

  return (
    <div className="app">
      <Ingredients.Provider value={{ ingredients }}>
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
