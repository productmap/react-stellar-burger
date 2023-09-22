import LoginForm from "../../components/login-form/login-form";
import styles from "./login.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <h2>Вход</h2>
      <LoginForm />
    </div>
  );
}
