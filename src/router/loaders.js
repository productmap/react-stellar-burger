import { burgersApi } from "../store/api/burgers.api";
import { store } from "../store";

export const feedLoader = async () => {
  const p = store.dispatch(burgersApi.endpoints.getFeed.initiate());
  try {
    const response = await p.unwrap();
    return response.orders;
  } catch (e) {
    console.log(e);
  } finally {
    p.unsubscribe();
  }
};

export const userFeedLoader = async () => {
  const p = store.dispatch(burgersApi.endpoints.getUserFeed.initiate());
  try {
    const response = await p.unwrap();
    return response.orders;
  } catch (e) {
    // https://reactrouter.com/en/main/fetch/redirect
    // return redirect("/login")
    console.log(e);
  } finally {
    p.unsubscribe();
  }
};
