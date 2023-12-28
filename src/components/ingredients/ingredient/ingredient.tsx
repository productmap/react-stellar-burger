import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.scss";
import { DragPreviewImage, useDrag } from "react-dnd";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/hooks";
import { IIngredient } from "../../../utils/types";

type Props = {
  ingredient: IIngredient;
};

export function Ingredient({ ingredient }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { burger } = useAppSelector((store) => store.burger);

  const quantity =
    [burger.bun, burger.ingredients, burger.bun].flat().length > 0
      ? [burger.bun, burger.ingredients, burger.bun]
          .flat()
          .filter((i) => (i ? i._id === ingredient._id : 0)).length
      : 0;

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
