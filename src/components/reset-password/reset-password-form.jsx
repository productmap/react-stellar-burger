import React, { useState } from "react";
import { useResetPasswordMutation } from "../../store/api/burgers.api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../registration-form/registration-form.module.scss";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [token, seToken] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  //  Ручка сброса пароля
  async function handleSubmit(e) {
    e.preventDefault();

    if (!password || !token) {
      toast.warn("Заполните все поля");
      return;
    }

    try {
      const response = await resetPassword({
        password: password,
        token: token,
      }).unwrap();
      if (response.success) {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <PasswordInput
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Введите новый пароль"
        error={false}
        extraClass="mb-6"
      />
      <Input
        name="token"
        placeholder="Введите код из письма"
        onChange={(e) => seToken(e.target.value)}
        value={token}
        extraClass="mb-6"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass="mb-20"
        disabled={isLoading}
      >
        {isLoading ? "Ожидайте" : "Сохранить"}
      </Button>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?{" "}
        <Link to={"/login"} className={styles.link}>
          Войти
        </Link>
      </p>
    </form>
  );
}
