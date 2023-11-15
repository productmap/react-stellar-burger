import FeedOrderDetails from "../../components/feed-order-details/feed-order-details";
import styles from "./feed-order.module.scss";

export default function FeedOrder() {
  return (
    <section className={styles.section}>
      <FeedOrderDetails />
    </section>
  );
}
