import React from "react";
import { Ingredient } from "../ingredient/ingredient";
import { ingredientPropType } from "../../../utils/prop-types";
import PropTypes from "prop-types";
import "./ingredients-group.scss";

export const IngredientsGroup = ({ groupKey, groupName, ingredients }) => {
  IngredientsGroup.propTypes = {
    groupKey: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  };

  return (
    <div className="ingredients-group pb-10">
      <h2 className="ingredients-group__header pb-6">{groupName}</h2>
      <div className="ingredients-group__list pr-4 pl-4">
        {ingredients.map((ingredient) => {
          if (ingredient.type === groupKey)
            return <Ingredient ingredient={ingredient} key={ingredient._id} />;
          return null;
        })}
      </div>
    </div>
  );
};
