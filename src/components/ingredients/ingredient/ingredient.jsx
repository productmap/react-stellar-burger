import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../../utils/prop-types";
import styles from "./ingredient.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIngredient } from "../../../store/current-ingredient";
import { DragPreviewImage, useDrag } from "react-dnd";
import clsx from "clsx";

Ingredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export function Ingredient({ ingredient, showCopyIcon }) {
  const dispatch = useDispatch();
  const { burger } = useSelector((store) => store.burger);

  const quantity = [burger.bun, burger.ingredients, burger.bun]
    .flat()
    .filter((i) => i._id === ingredient._id).length;

  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: "ingredient",
      item: ingredient,
      options: { dropEffect: "copy" },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    []
  );

  function handleIngredientDetails() {
    dispatch(setCurrentIngredient(ingredient));
  }

  const previewImg = new Image();
  previewImg.src = ingredient.image;
  // previewImg.className = styles.isActive;
  preview(previewImg, {
    captureDraggingState: true,
  });

  return (
    <>
      <DragPreviewImage connect={preview} src={ingredient.image} />
      <div
        className={styles.ingredient}
        onClick={handleIngredientDetails}
        ref={dragRef}
      >
        <img
          className={clsx(isDragging && styles.isDragging)}
          src={ingredient.image}
          alt={ingredient.name}
          ref={preview}
        />
        <p
          className={`${styles.ingredient__price} pt-2 pb-3 text text_type_digits-default`}
        >
          {ingredient.price} <CurrencyIcon type="primary" />
        </p>
        <span className={styles.ingredient__description}>
          {ingredient.name}
        </span>
        {quantity > 0 && (
          <Counter count={quantity} size="default" extraClass="m-1" />
        )}
      </div>
    </>
  );
}
