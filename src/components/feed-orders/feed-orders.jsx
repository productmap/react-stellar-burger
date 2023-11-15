import styles from "./feed-orders.module.scss";
import OrderItem from "../order-item/order-item";
import PropTypes, { object } from "prop-types";

// FeedOrders.propTypes = {
//   feed: PropTypes.array.isRequired,
// };

export default function FeedOrders({ feed }) {
  const readyOrders = feed["orders"].filter((order) => order.status === "done");

  return (
    <section className={styles.feedOrders}>
      <ul className={`${styles.ordersList} scroll-theme`}>
        {readyOrders.map((order, idx) => {
          return <OrderItem order={order} key={idx} />;
        })}
      </ul>
    </section>
  );
}
