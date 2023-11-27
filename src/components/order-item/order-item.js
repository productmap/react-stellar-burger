import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetIngredientsQuery } from "../../store/api/burgers.api";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-item.module.scss";
import clsx from "clsx";
import {orderPropType} from "../../utils/prop-types";

OrderItem.propTypes = {
  order: orderPropType
};

export default function OrderItem({ order }) {


  const navigate = useNavigate();
  const location = useLocation();
  const { data: ingredients } = useGetIngredientsQuery();

  const ingredientsList = order.ingredients.map((orderedIngredient) => {
    return ingredients.find((i) => i._id === orderedIngredient);
  });

  const uniqueIngredients = [...new Set(ingredientsList)];
  const maxIngredients = 5;

  const totalPrice = useMemo(
    () => ingredientsList.reduce((acc, i) => acc + i.price, 0),
    [ingredientsList]
  );

  const handlerOrderDetails = () => {
    navigate(
      `${order.number}`,
      {
        state: { background: location },
        unstable_viewTransition: true
      }
    );
  };

  return (
    <div className={styles.block} onClick={handlerOrderDetails}>
      {ingredients && (
        <>
          <div className={styles.header}>
            <p className={`text text_type_digits-default`}>#{order.number}</p>
            <p
              className={`${styles.orderDate} text text_type_main-default text_color_inactive`}
            >
              <FormattedDate date={new Date(order.updatedAt)} />
            </p>
          </div>
          <h3
            className={`${styles.burgerName} text text_type_main-medium pt-5`}
          >
            {order.name}
          </h3>
          <div className={`${styles.header} mt-10`}>
            <ul className={styles.list}>
              {uniqueIngredients.slice(0, maxIngredients).map((i, idx) => {
                return (
                  <li className={styles.item} key={idx}>
                    <img
                      className={styles.item__image}
                      src={i.image}
                      alt={i.name}
                      style={{ zIndex: uniqueIngredients.length - idx }}
                    />
                  </li>
                );
              })}
              {uniqueIngredients.length > maxIngredients &&
              uniqueIngredients.length - maxIngredients > 0 ? (
                <li
                  className={clsx(styles.item, styles.item_additional)}
                  style={{
                    zIndex: uniqueIngredients.length - maxIngredients + 1,
                  }}
                >
                  <p>+{uniqueIngredients.length - maxIngredients}</p>
                </li>
              ) : null}
            </ul>
            <span
              className={`${styles.totalPrice} text text_type_digits-default`}
            >
              {totalPrice} <CurrencyIcon type="primary" />
            </span>
          </div>
        </>
      )}
    </div>
  );
}
