import { useGetUserFeedQuery } from "../../store/api/burgers.api";
import FeedOrders from "../../components/feed-orders/feed-orders";
import styles from "./my-orders.module.scss";

export default function MyOrders() {
  const { data: feed, isLoading, isFetching } = useGetUserFeedQuery();

  return (
    <section className={styles.myOrders}>
      { isFetching ? (
        <>Загружаю...</>
      ) : (
        <FeedOrders feed={feed["orders"]} />
      )}
    </section>
  );
}
