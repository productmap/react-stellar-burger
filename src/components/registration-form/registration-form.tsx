import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "../registration-form/registration-form.module.scss";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useRegistrationMutation } from "../../store/api/burgers.api";
import { toast } from "react-toastify";

const formState = {
  name: "",
  email: "",
  password: "",
};

export default function RegistrationForm() {
  const location = useLocation();
  const [formValues, setFormValue] = useState(formState);
  const { name, email, password } = formValues;
  const [registration, { isSuccess, isLoading }] = useRegistrationMutation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValues, [e.target.name]: e.target.value });
  };

  //  Ручка регистрации
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!(name && email && password))  {
      toast("Заполните все поля");
      return;
    }

    try {
      await registration(formValues);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        name="name"
        placeholder="Имя"
        onChange={(e) => handleChange(e)}
        value={name}
        extraClass="mb-6"
      />
      <EmailInput
        name="email"
        placeholder="E-mail"
        onChange={(e) => handleChange(e)}
        value={email}
        extraClass="mb-6"
      />
      <PasswordInput
        name="password"
        onChange={(e) => handleChange(e)}
        value={password}
        // error={false}
        extraClass="mb-6"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass="mb-20"
        disabled={isLoading}
      >
        {isLoading ? "Ожидайте" : "Зарегистрироваться"}
      </Button>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Уже зарегистрированы?{" "}
        <Link to="/login" unstable_viewTransition className={styles.link}>
          Войти
        </Link>
      </p>
      {isSuccess && <Navigate to={from} replace />}
    </form>
  );
}
