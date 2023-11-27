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
} from "./pages";
import AppWrapper from "./components/app-wrapper/app-wrapper";
import Modal from "./components/modal/modal";
import { OnlyUnAuth, PrivateRoute } from "./hocs/private-route";
import IngredientDetails from "./components/ingredients/ingredient-details/ingredient-details";
import MyOrderDetails from "./components/my-order-details/my-order-details";
import CommonOrderDetails from "./components/feed-common-order-details/feed-common-order-details";

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
          <Route path="profile/orders/:id" element={<MyOrderDetails />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/:id" element={<CommonOrderDetails />} />
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
                <CommonOrderDetails />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal>
                <MyOrderDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}
