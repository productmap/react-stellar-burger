import styles from "./feed-order.module.scss";
import FeedOrderDetails from "../../components/feed-order-details/feed-order-details";

export default function FeedOrder() {
  return (
    <section className={styles.section}>
      <FeedOrderDetails />
    </section>
  );
}
