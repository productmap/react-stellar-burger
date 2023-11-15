import { useParams } from "react-router-dom";
import { useGetUserFeedQuery } from "../../store/api/burgers.api";
import FeedOrderDetails from "../feed-order-details/feed-order-details";

export default function FeedOrderPrivate() {
  const { id } = useParams();
  const { data: currentOrder } = useGetUserFeedQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.orders.find((i) => i.number === parseInt(id)),
    }),
  });

  if (currentOrder) return <FeedOrderDetails order={currentOrder} />;
}
