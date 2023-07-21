import { useState } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { ingredientPropType } from "../../utils/prop-types";
import { data } from "../../utils/data";
import "./app.scss";

export default function App() {
  const [ingredients] = useState(data);

  ingredients.propTypes = {
    ingredientPropType,
  };

  const [cart] = useState([
    "60666c42cc7b410027a1a9b1",
    "60666c42cc7b410027a1a9b9",
    "60666c42cc7b410027a1a9b4",
    "60666c42cc7b410027a1a9bc",
    "60666c42cc7b410027a1a9bb",
    "60666c42cc7b410027a1a9bb",
    "60666c42cc7b410027a1a9b1",
    "60666c42cc7b410027a1a9b1",
    "60666c42cc7b410027a1a9b1",
  ]);

  return (
    <div className="app">
      <AppHeader />
      <main className="constructor pb-10">
        <section className="constructor__column">
          <BurgerIngredients ingredients={ingredients} />
        </section>
        <section className="constructor__column pt-25">
          <BurgerConstructor ingredients={ingredients} cart={cart} />
        </section>
      </main>
    </div>
  );
}
