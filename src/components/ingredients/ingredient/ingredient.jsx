import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../../utils/prop-types";
import styles from "./ingredient.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIngredient } from "../../../store/current-ingredient";
import { useDrag } from "react-dnd";
import clsx from "clsx";
import { useMemo } from "react";

Ingredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export function Ingredient({ ingredient }) {
  const dispatch = useDispatch();
  const { burger } = useSelector((store) => store.burger);

  const quantity = [burger.bun, burger.ingredients, burger.bun]
    .flat()
    .filter((i) => i._id === ingredient._id).length;

  const [{ isDrag }, dragRef, dragPreviewRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
      // opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  function handleIngredientDetails() {
    dispatch(setCurrentIngredient(ingredient));
  }

  return (
    <div
      className={styles.ingredient}
      onClick={handleIngredientDetails}
      ref={dragRef}
    >
      <img
        className={clsx(isDrag && styles.isDrag)}
        src={ingredient.image}
        alt={ingredient.name}
        ref={dragPreviewRef}
      />
      <p
        className={`${styles.ingredient__price} pt-2 pb-3 text text_type_digits-default`}
      >
        {ingredient.price} <CurrencyIcon type="primary" />
      </p>
      <span className={styles.ingredient__description}>{ingredient.name}</span>
      {quantity > 0 && (
        <Counter count={quantity} size="default" extraClass="m-1" />
      )}
    </div>
  );
}
