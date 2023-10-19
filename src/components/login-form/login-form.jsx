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
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

const initialState = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { formValues, handleChange } = useForm(initialState);
  const { email, password } = formValues;
  const { from } = location.state || { from: { pathname: "/" } };
  const [login, { isSuccess, isLoading, error }] = useLoginMutation();

  useEffect(() => {
    toast.error(error?.data?.message);
  }, [error]);

  // Ручка авторизации
  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Заполните все поля");
      return
    }

    try {
      const response = await login(formValues).unwrap();
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
        <Link to={"/registration"} unstable_viewTransition className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <Link to={"/forgot-password"} unstable_viewTransition className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
      {isSuccess && <Navigate to={from} replace={true} />}
    </form>
  );
}
