import OrderItem from "../order-item/order-item";
import styles from "./feed-orders.module.scss";
import { IFeedOrder } from "../../utils/types";

export default function FeedOrders({ feed }: { feed: ReadonlyArray<IFeedOrder> }) {
  return (
    <>
      {feed && (
        <section className={styles.feedOrders}>
          <ul className={`${styles.ordersList} scroll-theme`}>
            {feed.map((order, idx) => {
              return <OrderItem order={order} key={idx} />;
            })}
          </ul>
        </section>
      )}
    </>
  );
}
