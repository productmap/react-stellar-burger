import { useRef } from "react";
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor.module.scss";
import { removeIngredient } from "../../../store/burger";
import { IIngredient } from "../../../utils/types";
import { useAppDispatch } from "../../../hooks/hooks";
const style = {
  cursor: "move",
};

type TBurgerIngredient = {
  id: string;
  ingredient: IIngredient;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
};

export function BurgerIngredient({
  id,
  ingredient,
  index,
  moveIngredient,
}: TBurgerIngredient) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const [, drop] = useDrop<{ id: string; index: number }>({
    accept: "burgerIngredient",
    collect(monitor: DropTargetMonitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect() || {
        bottom: 0,
        top: 0,
      };
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: "burgerIngredient",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const previewImg = new Image();
  previewImg.src = ingredient.image;
  preview(previewImg, {
    captureDraggingState: true,
  });

  return (
    <li
      ref={ref}
      className={`${styles.constructor__pos} pr-1`}
      style={{ ...style, opacity }}
      // data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => dispatch(removeIngredient(ingredient.key))}
      />
    </li>
  );
}
