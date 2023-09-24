import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login-form.module.scss";
import { useLoginMutation } from "../../store/api/burgers.api";
import { setUser } from "../../store/user";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [formValues, setFormValues] = useState(initialState);
  const { email, password } = formValues;
  const { from } = location.state || { from: { pathname: "/" } };
  const [login, { isSuccess, isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // Ручка авторизации
  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      toast("Заполните все поля");
      return;
    }

    try {
      const response = await login(formValues).unwrap();
      console.log(response)
      dispatch(setUser(response));
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <EmailInput
        name={"email"}
        placeholder={"E-mail"}
        onChange={(e) => handleChange(e)}
        value={email}
        extraClass="mb-6"
      />
      <PasswordInput
        name={"password"}
        onChange={(e) => handleChange(e)}
        value={password}
        error={false}
        extraClass="mb-6"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass="mb-20"
        disabled={isLoading}
      >
        {isLoading ? "Ожидайте" : "Войти"}
      </Button>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы — новый пользователь?{" "}
        <Link to={"/registration"} className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <Link to={"/forgot-password"} className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
      {isSuccess && <Navigate to={from} replace={true} />}
    </form>
  );
}
