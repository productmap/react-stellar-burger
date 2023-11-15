import FeedOrders from "../../components/feed-orders/feed-orders";
import styles from "./my-orders.module.scss"
import {useGetIngredientsQuery, useGetUserFeedQuery} from "../../store/api/burgers.api";

export default function MyOrders() {
  const { data: feed = [], isLoading } = useGetUserFeedQuery();
  const { data: ingredients } = useGetIngredientsQuery();

  return (
    <section className={styles.container}>
      {isLoading ? (
        <>Загрузка...</>
      ) : feed && ingredients? (
        <FeedOrders feed={feed} />
      ) : (
        <>Нет заказов</>
      )}
    </section>
  );
}
