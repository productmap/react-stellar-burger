import React from "react";
import "./burger-ingredients.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsGroup } from "./ingredients-group/ingredients-group";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";

const BurgerIngredients = ({ ingredients }) => {
  BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  };

  const ingredientsGroups = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };

  const [current, setCurrent] = React.useState("bun");

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
