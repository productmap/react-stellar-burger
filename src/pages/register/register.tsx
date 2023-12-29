import React from "react";
import styles from "../login/login.module.scss";
import RegistrationForm from "../../components/registration-form/registration-form";

export default function Register() {
  return (
    <div className={styles.container}>
      <h2>Регистрация</h2>
      <RegistrationForm />
    </div>
  );
}
