import React from "react";
import { Ingredient } from "../ingredient/ingredient";
import "./ingredients-group.scss";

export const IngredientsGroup = ({ groupKey, groupName, ingredients }) => {
  return (
    <div className="ingredients-group pb-10">
      <h2 className="ingredients-group__header pb-6">{groupName}</h2>
      <div className="ingredients-group__list pr-4 pl-4">
      {ingredients.map((ingredient) => {
        if (ingredient.type === groupKey)
          return <Ingredient ingredient={ingredient} key={ingredient._id} />;
        return null
      })}
      </div>
    </div>
  );
};
