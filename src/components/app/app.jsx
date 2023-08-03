import { useEffect, useState } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import "./app.scss";
import getIngredients from "../../utils/api";

export default function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
  });
  const [cart, setCart] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    ingredientsData();
  }, []);

  const ingredientsData = () => {
    setState({ hasError: false, isLoading: true });
    getIngredients()
      .then((data) => {
        setState({ hasError: false, isLoading: false });
        setIngredients(data.data);
        setCart([
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0944",
          "643d69a5c3f7b9001cfa093f",
          "643d69a5c3f7b9001cfa0947",
          "643d69a5c3f7b9001cfa0946",
          "643d69a5c3f7b9001cfa0946",
        ]);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
        setApiError(`Ошибка: ${error}`);
        setState({ hasError: true, isLoading: false });
      });
  };

  return (
    <div className="app">
      {state.isLoading && "Загрузка..."}
      {state.hasError && "Произошла ошибка"}
      {apiError}
      {!state.isLoading && !state.hasError && ingredients.length && (
        <>
          <AppHeader />
          <main className="constructor pb-10">
            <section className="constructor__column">
              <BurgerIngredients
                ingredients={ingredients}
              />
            </section>
            <section className="constructor__column pt-25">
              <BurgerConstructor
                ingredients={ingredients}
                cart={cart}
              />
            </section>
          </main>
        </>
      )}
    </div>
  );
}
