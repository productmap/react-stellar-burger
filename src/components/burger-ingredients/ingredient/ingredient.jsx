import './ingredient.scss'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export const Ingredient = ({ ingredient }) => {
  return (
    <div className="ingredient">
      <img src={ingredient.image} alt={ingredient.name} />
      <p className="ingredient__price pt-2 pb-3 text text_type_digits-default">{ingredient.price} <CurrencyIcon type="primary"/></p>
      <span className="ingredient__description">{ingredient.name}</span>
      <Counter count={1} size="default" extraClass="m-1" />
    </div>
  );
};
