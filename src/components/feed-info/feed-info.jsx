import React from "react";
import styles from "./feed-info.module.scss";
import { useGetFeedQuery } from "../../store/api/burgers.api";
import {Link} from "react-router-dom";

export default function FeedInfo() {
  const { data: feed = [] } = useGetFeedQuery();
  let total = feed.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const totalToday = feed.totalToday
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const readyOrders = feed.orders.filter((order) => order.status === "done");
  const notReadyOrders = feed.orders.filter(
    (order) => order.status === "done"
  );

  return (
    <section className={styles.feedInfo}>
      <div className={styles.feedLists}>
        <div className={styles.column}>
          <p className="text text_type_main-medium">Готовы:</p>
          <ul className={styles.ordersList}>
            {readyOrders.map((order) => {
              return (
                <li key={order._id} className={`${styles.orderNumber} text text_type_digits-default`}>
                  <Link to={`/feed/${order.number}`} className="text text_type_digits-default" unstable_viewTransition>{order.number}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.column}>
          <p className="text text_type_main-medium">В работе:</p>
          <ul className={styles.ordersList}>
            {notReadyOrders.map((order) => {
              return (
                <li key={order._id}>
                  <Link to={`/feed/${order.number}`} className="text text_type_digits-default" unstable_viewTransition>{order.number}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <p className="text text_type_main-medium pt-15">Выполнено за все время:</p>
      <p className={`${styles.totalNum} text text_type_digits-large`}>
        {total}
      </p>
      <p className="text text_type_main-medium pt-15">Выполнено за сегодня:</p>
      <p className={`${styles.totalNum} text text_type_digits-large`}>
        {totalToday}
      </p>
    </section>
  );
}
