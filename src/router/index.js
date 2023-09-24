import { createBrowserRouter } from "react-router-dom";
import AppWrapper from "../components/app-wrapper/app-wrapper";
import {
  PrivateRoute,
  OnlyUnAuth,
} from "../components/private-route/private-route";
import {
  App,
  ErrorPage,
  ForgotPassword,
  IngredientInfo,
  Login,
  OrderFeed,
  Profile,
  Register,
  ResetPassword,
} from "../pages";
import MyOrders from "../pages/my-orders/my-orders";
import MyInfo from "../pages/my-info/my-info";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
        // loader: burgersApi.endpoints.getIngredients.initiate(),
        // loader: async () => {
        //   return data;
        // },
      },
      {
        path: "login",
        element: <OnlyUnAuth component={<Login />} />,
      },
      {
        path: "registration",
        element: <OnlyUnAuth component={<Register />} />,
      },
      {
        path: "forgot-password",
        element: <OnlyUnAuth component={<ForgotPassword />} />,
      },
      {
        path: "reset-password",
        element: <OnlyUnAuth component={<ResetPassword />} />,
      },
      {
        path: "profile",
        element: <PrivateRoute component={<Profile />} />,
        children: [
          {
            path: "",
            element: <MyInfo />,
          },
          {
            path: "orders",
            element: <MyOrders />,
          },
        ],
      },
      {
        path: "orders",
        element: <OrderFeed />,
      },
      {
        path: "/ingredients/:id",
        element: <IngredientInfo />,
        // element: (
        //   <Modal header="Детали ингредиента" modalClose={() => {}}>
        //     <IngredientDetails />
        //   </Modal>
        // ),
      },
    ],
  },
]);