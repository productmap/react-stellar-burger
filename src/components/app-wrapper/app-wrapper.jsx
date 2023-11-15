import { Outlet } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import styles from "./app-wrapper.module.scss";
import { ToastContainer } from "react-toastify";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppWrapper() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
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
        icon=<BurgerIcon type="primary" />
      />
    </div>
  );
}
