import OrderItem from "../order-item/order-item";
import styles from "./feed-orders.module.scss";
import { orderPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";

export default function FeedOrders({ feed }) {
  return (
    <section className={styles.feedOrders}>
      <ul className={`${styles.ordersList} scroll-theme`}>
        {feed.map((order, idx) => {
          return <OrderItem order={order} key={idx} />;
        })}
      </ul>
    </section>
  );
}

FeedOrders.propTypes = {
  feed: PropTypes.arrayOf(orderPropType),
};
