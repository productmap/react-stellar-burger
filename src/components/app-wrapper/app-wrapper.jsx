import { Outlet } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import styles from "./app-wrapper.module.scss";
import { ToastContainer } from "react-toastify";
import {useDispatch} from "react-redux";
import React, { useEffect } from "react";
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
        icon=<BurgerIcon type="primary" />
      />
    </div>
  );
}
