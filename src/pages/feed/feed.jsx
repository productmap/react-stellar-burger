import styles from "./feed.module.scss";
import FeedInfo from "../../components/feed-info/feed-info";
import FeedOrders from "../../components/feed-orders/feed-orders";
import {
  useGetFeedQuery,
  useGetIngredientsQuery,
} from "../../store/api/burgers.api";

export default function Feed() {
  const {
    data: feed = [],
    isError,
    error,
    isLoading,
    isFetching,
  } = useGetFeedQuery();

  const { data: ingredients } = useGetIngredientsQuery();

  return (
    <section className={styles.feed}>
      <h2 className="text text_type_main-large pt-10 pb-5">Лента заказов</h2>
      {isError ? (
        <>Произошла ошибка: {error}</>
      ) : isLoading || isFetching ? (
        <>Загрузка...</>
      ) : feed && ingredients ? (
        <>
          <FeedOrders feed={feed} />
          <FeedInfo />
        </>
      ) : null}
    </section>
  );
}
