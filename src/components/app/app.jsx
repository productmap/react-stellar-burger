import "./app.scss";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import Constructor from "../constructor/constructor";
import { useState } from "react";
import { ingredientPropType } from "../../utils/prop-types";

function App() {
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

  const [ingredients] = useState(data);

  ingredients.propTypes = {
    ingredientPropType,
  };

  return (
    <div className="app">
      <AppHeader />
      <Constructor ingredients={ingredients} cart={cart} />
    </div>
  );
}

export default App;
