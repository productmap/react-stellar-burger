import {useParams} from "react-router-dom";
import {useGetFeedQuery} from "../../store/api/burgers.api";
import FeedOrderDetails from "../feed-order-details/feed-order-details";
import { IFeedOrder } from "../../utils/types";

export default function CommonOrderDetails() {
  const { id } = useParams<{ id: string }>();
  const orderId: number = id ? parseInt(id) : 0;
  const { data: order } = useGetFeedQuery("general", {
    selectFromResult: ({ data }) => ({
      data: data?.orders.find((i: IFeedOrder) => i.number === orderId),
    }),
  });

  return order ? <FeedOrderDetails order={order} /> : null;
}
