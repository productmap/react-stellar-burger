import {useParams} from "react-router-dom";
import {useGetFeedQuery} from "../../store/api/burgers.api";
import FeedOrderDetails from "../feed-order-details/feed-order-details";

export default function CommonOrderDetails() {
  const { id } = useParams();
  const { data: currentOrder } = useGetFeedQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.orders.find((i) => i.number === parseInt(id)),
    }),
  });

  if (currentOrder) return <FeedOrderDetails order={currentOrder} />;
}
