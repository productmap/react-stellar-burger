import { createBrowserRouter } from "react-router-dom";
import AppWrapper from "../components/app-wrapper/app-wrapper";
import {
  PrivateRoute,
  OnlyUnAuth,
} from "../hoc/private-route";

// Страницы
import {
  Constructor,
  ErrorPage,
  ForgotPassword,
  IngredientInfo,
  Login,
  OrderFeed,
  Profile,
  Register,
  ResetPassword,
  MyOrders,
  MyInfo,
} from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Constructor />,
        // loader: burgersApi.endpoints.getIngredients.initiate(),
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
