import { createBrowserRouter } from "react-router-dom";
import AppWrapper from "../components/app-wrapper/app-wrapper";
import { PrivateRoute, OnlyUnAuth } from "../hocs/private-route";
import { userFeedLoader, feedLoader } from "./loaders";

// Страницы
import {
  Constructor,
  ErrorPage,
  ForgotPassword,
  IngredientInfo,
  Login,
  Feed,
  Profile,
  Register,
  ResetPassword,
  MyOrders,
  MyInfo,
  FeedOrder,
} from "../pages";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Constructor />,
        children: [
          // {
          //   path: "ingredients/:id",
          //   element: <IngredientInfo />,
          // },
        ],
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
            loader: userFeedLoader,
            children: [
              {
                path: ":id",
                element: <FeedOrder />,
              },
            ],
          },
        ],
      },
      {
        path: "feed",
        element: <Feed />,
        loader: feedLoader,
      },
      {
        path: "/feed/:id",
        element: <FeedOrder />,
      },
    ],
  },
]);
