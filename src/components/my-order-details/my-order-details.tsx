import { useParams } from "react-router-dom";
import { useGetUserFeedQuery } from "../../store/api/burgers.api";
import FeedOrderDetails from "../feed-order-details/feed-order-details";
import { IFeedOrder } from "../../utils/types";

export default function MyOrderDetails() {
  const { id } = useParams<{ id: string }>();
  const orderId: number = id ? parseInt(id) : 0;
  const { data: currentOrder } = useGetUserFeedQuery("general", {
    selectFromResult: ({ data }) => ({
      data: data?.orders.find((i: IFeedOrder) => i.number === orderId),
    }),
  });

  return currentOrder ? <FeedOrderDetails order={currentOrder} /> : null;
}
