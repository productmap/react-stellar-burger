import { useGetFeedQuery } from "../../store/api/burgers.api";
import FeedInfo from "../../components/feed-info/feed-info";
import FeedOrders from "../../components/feed-orders/feed-orders";
import styles from "./feed.module.scss";

export default function Feed() {
  const { data: feed = [], isLoading } = useGetFeedQuery();

  return (
    <section className={styles.feed}>
      <h2 className={`${styles.header} text text_type_main-large pt-10 pb-5`}>
        Лента заказов
      </h2>
      {isLoading ? (
        <>Загрузка...</>
      ) : feed ? (
        <div className={styles.twoColumns}>
          <FeedOrders feed={feed["orders"]} />
          <FeedInfo />
        </div>
      ) : (
        <>Нет заказов</>
      )}
    </section>
  );
}
