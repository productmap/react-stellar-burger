import styles from "./forgot-password.module.scss";
import ForgotPasswordForm from "../../components/forgot-password-form/forgot-password-form";

export default function ForgotPassword() {
  return (
    <div className={styles.container}>
      <h2>Восстановление пароля</h2>
      <ForgotPasswordForm />
    </div>
  );
}
