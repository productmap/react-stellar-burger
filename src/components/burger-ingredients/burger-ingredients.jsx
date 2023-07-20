import React from "react";
import "./burger-ingredients.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "./ingredient/ingredient";
import { IngredientsGroup } from "./ingredients-group/ingredients-group";

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = React.useState("one");

  const ingredientsGroups = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };

  return (
    <>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        {Object.keys(ingredientsGroups).map((key) => {
          return (
            <Tab
              value={key}
              active={current === { key }}
              onClick={setCurrent}
              key={key}
            >
              {ingredientsGroups[key]}
            </Tab>
          );
        })}
      </div>
      <div className="itemList burger-ingredients custom-scroll mt-10">
        {Object.keys(ingredientsGroups).map((key) => {
          return (
            <IngredientsGroup
              groupKey={key}
              groupName={ingredientsGroups[key]}
              ingredients={ingredients}
              key={key}
            />
          );
        })}
      </div>
    </>
  );
};

export default BurgerIngredients;
