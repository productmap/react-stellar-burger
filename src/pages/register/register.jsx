import React from "react";
import styles from "../login/login.module.css";
import RegistrationForm from "../../components/registration-form/registration-form";

export default function Register(props) {
  return (
    <div className={styles.container}>
      <h2>Регистрация</h2>
      <RegistrationForm />
    </div>
  );
}
