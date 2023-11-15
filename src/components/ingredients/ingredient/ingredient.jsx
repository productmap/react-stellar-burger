import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../../utils/prop-types";
import styles from "./ingredient.module.scss";
import { useSelector } from "react-redux";
import { DragPreviewImage, useDrag } from "react-dnd";
import clsx from "clsx";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Modal from "../../modal/modal";

Ingredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export function Ingredient({ ingredient }) {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;
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

  const previewImg = new Image();
  previewImg.src = ingredient.image;
  preview(previewImg, {
    captureDraggingState: true,
  });

  function handleIngredientDetails() {
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
      unstable_viewTransition: true,
    });
  }

  return (
    <>
      {/*{background && (*/}
      {/*  <Routes>*/}
      {/*    <Route path="/ingredients/:id" element={<Modal />} />*/}
      {/*  </Routes>*/}
      {/*)}*/}
      <DragPreviewImage connect={preview} src={ingredient.image} />
      <div
        className={styles.ingredient}
        onClick={handleIngredientDetails}
        ref={dragRef}
      >
        <img
          className={clsx(
            isDragging && styles.isDragging,
            styles.ingredient__image
          )}
          src={ingredient.image}
          alt={ingredient.name}
          ref={preview}
          // style={{ viewTrinsitionName: "ingredient" }}
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
