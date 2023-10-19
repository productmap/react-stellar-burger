import React, { useEffect, useState } from "react";
import styles from "./feed-order-details.module.scss";
import { useParams } from "react-router-dom";
import {
  useGetFeedQuery,
  useGetIngredientsQuery,
} from "../../store/api/burgers.api";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function FeedOrderDetails() {
  const { id } = useParams();
  const { data: order } = useGetFeedQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.orders.find((i) => i.number === parseInt(id)),
    }),
  });
  const { data: ingredients } = useGetIngredientsQuery();
  const [totalPrice, setTotalPrice] = useState(null);
  const [orderIngredients, setOrderIngredients] = useState([]);

  useEffect(() => {
    if (order && ingredients) {
      const ingredientsList = order.ingredients.map((orderedIngredient) => {
        return ingredients.find((i) => i._id === orderedIngredient);
      });
      setTotalPrice(ingredientsList.reduce((acc, i) => acc + i.price, 0));
      const countedIngredients = [
        ...ingredientsList
          .reduce((order, item) => {
            if (!order.has(item._id))
              order.set(item._id, { ...item, count: 0 });
            order.get(item._id).count++;
            return order;
          }, new Map())
          .values(),
      ];
      setOrderIngredients(countedIngredients);
    }
  }, [order, ingredients]);

  return (
    <>
      {order && (
        <>
          <h2 className={`${styles.header} text text_type_digits-default`}>
            #{order.number}
          </h2>
          <p className={`${styles.burgerName} text text_type_main-medium pt-5`}>
            {order.name}
          </p>
          <p className={`${styles.status} text text_type_main-default pt-2`}>
            Выполнен
          </p>
          <p
            className={`${styles.burgerName} text text_type_main-medium pt-15`}
          >
            Состав:
          </p>
          <ul className={styles.list}>
            {orderIngredients.map((i, idx) => {
              return (
                <li className={styles.item} key={idx}>
                  <img
                    className={styles.item__image}
                    src={i.image}
                    alt={i.name}
                  />
                  <p
                    className={`${styles.item__description} text text_type_main-default`}
                  >
                    {i.name}
                  </p>
                  <p
                    className={`${styles.item__price} text text_type_digits-default`}
                  >
                    {i.count} x {i.price} <CurrencyIcon type="primary" />
                  </p>
                </li>
              );
            })}
          </ul>
          <div className={`${styles.total} mt-10`}>
            <p className="text text_type_main-default text_color_inactive">
              <FormattedDate date={new Date(order.updatedAt)} />
            </p>
            <span className="text text_type_digits-default">
              {totalPrice} <CurrencyIcon type="primary" />
            </span>
          </div>
        </>
      )}
    </>
  );
}
