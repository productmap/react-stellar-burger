import { Outlet } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import styles from "./app-wrapper.module.scss";
import { ToastContainer } from "react-toastify";
// import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {useGetIngredientsQuery, useGetUserQuery} from "../../store/api/burgers.api";
import {useEffect} from "react";
import {reAuthUser} from "../../store/user";
import {useDispatch} from "react-redux";

export default function AppWrapper() {
  const { isLoading } = useGetIngredientsQuery(undefined);
  const { data: currentUser } = useGetUserQuery(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) dispatch(reAuthUser(currentUser));
  }, [currentUser, dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>{!isLoading && <Outlet />}</main>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="burgerToast"
        bodyClassName="burgerToastBody"
        // icon=<BurgerIcon type="primary" />
      />
    </div>
  );
}
