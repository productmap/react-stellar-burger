import { Link, Navigate, useLocation } from "react-router-dom";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login-form.module.scss";
import { useLoginMutation } from "../../store/api/burgers.api";
import { setUser } from "../../store/user";
import { toast } from "react-toastify";
import { useForm } from "../../hooks/useForm";
import { FormEvent, useEffect } from "react";
import { CustomError } from "../../utils/types";
import { useAppDispatch } from "../../hooks/hooks";

const initialState = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { formValues, handleChange } = useForm(initialState);
  const { email, password } = formValues;
  const { from } = location.state || { from: { pathname: "/" } };
  const [login, { isSuccess, isLoading, error }] = useLoginMutation();

  useEffect(() => {
    toast.error((error as CustomError)?.data?.message);
  }, [error]);

  // Ручка авторизации
  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      toast.info(
        "Если забыли регистрационные данные, воспользуйтесь восстановлением."
      );
      return;
    }

    try {
      const response = await login(formValues).unwrap();
      dispatch(setUser(response));
    } catch (error) {
      toast.error((error as CustomError)?.data?.message);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <EmailInput
        name={"email"}
        placeholder={"E-mail"}
        onChange={handleChange}
        value={email}
        extraClass="mb-6"
      />
      <PasswordInput
        name={"password"}
        onChange={handleChange}
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
        {isLoading ? "Ожидайте" : "Войти"}
      </Button>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы — новый пользователь?{" "}
        <Link
          to={"/registration"}
          unstable_viewTransition
          className={styles.link}
        >
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <Link
          to={"/forgot-password"}
          unstable_viewTransition
          className={styles.link}
        >
          Восстановить пароль
        </Link>
      </p>
      {isSuccess && <Navigate to={from} replace />}
    </form>
  );
}
