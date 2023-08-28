import { useCallback, useMemo } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setOrderNumber } from "../../store/order-number";
import {
  addIngredient,
  newBurger,
  sortedBurger,
} from "../../store/burger/burger";
import { useDrop } from "react-dnd";
import clsx from "clsx";
import BurgerDetails from "./burger-details/burger-details";
import { BurgerIngredient } from "./burger-ingredient/burger-ingredient";
import { useOrderBurgerMutation } from "../../store/api/burgers.api";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const { orderNumber } = useSelector((store) => store.orderNumber);
  const { burger } = useSelector((store) => store.burger);
  const burgerBun = burger.bun;

  // Добавление перетаскиваемого ингредиента
  const [{ isHover, isActive }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      isActive: monitor.canDrop(),
    }),
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
    },
  });

  // Сортировка
  const moveIngredient = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch(sortedBurger({ dragIndex, hoverIndex }));
    },
    [dispatch]
  );

  const renderIngredient = useCallback(
    (ingredient, index) => {
      return (
        <BurgerIngredient
          key={ingredient.key}
          index={index}
          id={ingredient._id}
          ingredient={ingredient}
          moveIngredient={moveIngredient}
        />
      );
    },
    [moveIngredient]
  );

  // Счетчик суммы заказа
  const totalPrice = useMemo(() => {
    const ingredientsPrice = burger.ingredients.reduce(
      (acc, el) => acc + el.price,
      0
    );
    const bunsPrice = burger.bun.price ? burger.bun.price * 2 : 0;
    return ingredientsPrice + bunsPrice;
  }, [burger]);

  // Ручка заказа
  const [orderBurger, { isLoading }] = useOrderBurgerMutation();
  async function handleOrderBurger(burger) {
    if (!burger.bun) return;
    try {
      const ingredientsList = burger.ingredients.map((i) => i._id);
      const finalOrderList = [
        burger.bun._id,
        ...ingredientsList,
        burger.bun._id,
      ];
      const response = await orderBurger(finalOrderList).unwrap();
      dispatch(setOrderNumber(response.order.number));
      dispatch(newBurger());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className={styles.constructor}>
      <ul
        className={clsx(
          styles.constructor__list,
          isHover && styles.isHover,
          isActive && styles.isActive
        )}
        ref={dropTarget}
      >
        {/* верхняя булка */}
        {burgerBun ? (
          <li className={styles.constructor__pos}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={burgerBun.name + " (верх)"}
              price={burgerBun.price}
              thumbnail={burgerBun.image}
            />
          </li>
        ) : (
          <li className={clsx(styles.empty, styles.empty_top, isActive && styles.isActive)}>
            Перетащите сюда булку
          </li>
        )}

        {/* Ингредиенты */}
        {burger.ingredients.length === 0 ? (
          <li className={styles.empty}>
            <p>Перетащите сюда ингредиенты</p>
          </li>
        ) : (
          <ul className={`${styles.constructor__ingredients} custom-scroll`}>
            {burger.ingredients.map((ingredient, idx) =>
              renderIngredient(ingredient, idx)
            )}
          </ul>
        )}

        {/* нижняя булка */}
        {burgerBun ? (
          <li className={styles.constructor__pos}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={burgerBun.name + " (низ)"}
              price={burgerBun.price}
              thumbnail={burgerBun.image}
            />
          </li>
        ) : (
          <li className={clsx(styles.empty, styles.empty_bottom)}>
            Перетащите сюда булку
          </li>
        )}

        {/*Энергетическая ценность*/}
        {totalPrice > 0 && (
          <li>
            <BurgerDetails />
          </li>
        )}

        <li className={styles.constructor__total}>
          <p className={`text text_type_digits-medium`}>
            {totalPrice} <CurrencyIcon type="primary" />
          </p>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            extraClass="mr-4"
            disabled={isLoading}
            onClick={() => handleOrderBurger(burger)}
          >
            {isLoading ? "Отправка..." : "Оформить заказ"}
          </Button>
        </li>
      </ul>
      {orderNumber && (
        <Modal modalClose={() => dispatch(setOrderNumber(null))}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
}
