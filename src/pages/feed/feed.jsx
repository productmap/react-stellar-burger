import {
  useGetFeedQuery,
  useGetIngredientsQuery,
} from "../../store/api/burgers.api";
import styles from "./feed.module.scss";
import FeedInfo from "../../components/feed-info/feed-info";
import FeedOrders from "../../components/feed-orders/feed-orders";

export default function Feed() {
  const { data: ingredients = [], isLoading: ingredientsIsLoading } =
    useGetIngredientsQuery();
  const { data: feed = [], isLoading: feedIsLoading } = useGetFeedQuery();

  return (
    <div className={styles.feed}>
      {ingredientsIsLoading || feedIsLoading ? (
        <>Загрузка...</>
      ) : feed && ingredients ? (
        <>
          <FeedOrders />
          <FeedInfo />
        </>
      ) : null}
    </div>
  );
}
