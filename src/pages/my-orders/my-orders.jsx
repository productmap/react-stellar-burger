import { useGetUserFeedQuery } from "../../store/api/burgers.api";
import styles from "./my-orders.module.scss";
import FeedOrders from "../../components/feed-orders/feed-orders";

export default function MyOrders() {
  const { data: feed, isLoading, isFetching } = useGetUserFeedQuery();

  return (
    <section className={styles.myOrders}>
      {isLoading && isFetching ? (
        <>Загружаю...</>
      ) : feed ? (
        <FeedOrders feed={[...feed["orders"]].reverse()} />
      ) : null}
    </section>
  );
}
