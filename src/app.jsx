import { Route, Routes, useLocation } from "react-router-dom";
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
} from "./pages";
import AppWrapper from "./components/app-wrapper/app-wrapper";
import Modal from "./components/modal/modal";
import { OnlyUnAuth, PrivateRoute } from "./hocs/private-route";
import IngredientDetails from "./components/ingredients/ingredient-details/ingredient-details";
import FeedOrderPrivate from "./components/feed-order-private/feed-order-private";
import FeedOrderCommon from "./components/feed-order-common/feed-order-common";

export default function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<AppWrapper />} errorElement={<ErrorPage />}>
          <Route path="" element={<Constructor />} />
          <Route path="login" element={<OnlyUnAuth component={<Login />} />} />
          <Route
            path="registration"
            element={<OnlyUnAuth component={<Register />} />}
          />
          <Route
            path="forgot-password"
            element={<OnlyUnAuth component={<ForgotPassword />} />}
          />
          <Route
            path="reset-passwor"
            element={<OnlyUnAuth component={<ResetPassword />} />}
          />
          <Route
            path="profile"
            element={<PrivateRoute component={<Profile />} />}
          >
            <Route path="" element={<MyInfo />} />
            <Route path="orders" element={<MyOrders />} >

            </Route>

          </Route>
          <Route path="profile/orders/:id" element={<FeedOrderPrivate />} index={true}/>
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/:id" element={<FeedOrderCommon />} />
          <Route path="/ingredients/:id" element={<IngredientInfo />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/login"
            element={
              <Modal>
                <OnlyUnAuth component={<Login />} />
              </Modal>
            }
          />
          <Route
            path="/ingredients/:id"
            element={
              <Modal title={"Детали ингредиента"}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal>
                <FeedOrderCommon />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal>
                <FeedOrderPrivate />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}
