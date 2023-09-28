import React, { useState } from "react";
import styles from "../registration-form/registration-form.module.scss";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "../../store/api/burgers.api";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  //  Ручка восстановления пароля
  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      toast.error("Введите указанный при регистрации email адрес");
      return;
    }

    try {
      const response = await forgotPassword({ email: email }).unwrap();
      if (response.success) {
        navigate("/reset-password");
      } else {
        toast.error("Пользователь не найден");
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <EmailInput
        name="email"
        placeholder="Укажите e-mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        extraClass="mb-6"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass="mb-20"
        disabled={isLoading}
      >
        {isLoading ? "Ожидайте" : "Восстановить"}
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
