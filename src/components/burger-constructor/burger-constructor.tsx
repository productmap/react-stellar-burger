import { useCallback, useMemo } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import styles from "./burger-constructor.module.scss";
import { setOrderNumber } from "../../store/order-number";
import { addIngredient, newBurger, sortedBurger } from "../../store/burger";
import { useDrop } from "react-dnd";
import clsx from "clsx";
import BurgerDetails from "./burger-details/burger-details";
import { BurgerIngredient } from "./burger-ingredient/burger-ingredient";
import { useOrderBurgerMutation } from "../../store/api/burgers.api";
import {toast} from "react-toastify";
import OrderDetails from "../order-details/order-details";
import { useNavigate } from "react-router-dom";
import { IIngredient } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";


export default function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const { orderNumber } = useAppSelector((store) => store.orderNumber);
  const { burger } = useAppSelector((store) => store.burger);
  const burgerBun = burger.bun;
  const user = useAppSelector((store) => store.user);
  const navigate = useNavigate();

  // Добавление перетаскиваемого ингредиента
  const [{ isOver }, dropTarget] = useDrop<
    IIngredient,
    void,
    { isOver: boolean }
  >({
    accept: "ingredient",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop(item) {
      dispatch(addIngredient(item));
    },
  });

  // Сортировка
  const moveIngredient = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(sortedBurger({ dragIndex, hoverIndex }));
    },
    [dispatch]
  );

  const renderIngredient = useCallback(
    (ingredient: IIngredient, index: number) => {
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

    const bunsPrice = burger.bun ? burger.bun.price * 2 : 0;

    return ingredientsPrice + bunsPrice;
  }, [burger]);

  // Ручка заказа
  const [orderBurger, { isLoading }] = useOrderBurgerMutation();

  async function handleOrderBurger() {
    if (!burger.bun) {
      toast.info("Без космических булок чуда не будет");
      return;
    }

    if (!user.isAuthenticated) {
      navigate("/login", { unstable_viewTransition: true });
    } else {
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
      } catch (error: any) {
        if (error.data.message) {
          toast.error(error.data.message);
        }
      }
    }
  }

  return (
    <section className={`${styles.constructor}`}>
      <ul
        className={clsx(styles.constructor__list, isOver && styles.isHover)}
        ref={dropTarget}
      >
        {/* Верхняя булка */}
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
          <li className={clsx(styles.empty, styles.empty_top)}>
            Перетащите сюда булку
          </li>
        )}

        {/* Ингредиенты */}
        {burger.ingredients.length === 0 ? (
          <li
            className={clsx(
              styles.empty,
              burgerBun &&
                burger.ingredients.length === 0 &&
                styles.emptyIngredients
            )}
          >
            <p>Перетащите сюда ингредиенты</p>
          </li>
        ) : (
          <ul className={`${styles.constructor__ingredients} scroll-theme`}>
            {burger.ingredients.map((ingredient, idx) =>
              renderIngredient(ingredient, idx)
            )}
          </ul>
        )}

        {/* Нижняя булка */}
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

        {/* Энергетическая ценность */}
        {totalPrice > 0 && (
          <li>
            <BurgerDetails />
          </li>
        )}

        {/* Итог */}
        <li className={styles.constructor__total}>
          <p className="text text_type_digits-medium">
            {totalPrice} <CurrencyIcon type="primary" />
          </p>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            extraClass="mr-4"
            disabled={isLoading}
            onClick={() => handleOrderBurger()}
          >
            {isLoading ? "Отправка..." : "Оформить заказ"}
          </Button>
        </li>
      </ul>

      {/* Модалка заказа */}
      {orderNumber && (
        <Modal modalClose={() => dispatch(setOrderNumber(null))}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
}
