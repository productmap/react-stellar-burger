import styles from "./reset-password.module.scss";
import ResetPasswordForm from "../../components/reset-password/reset-password-form";

export default function ResetPassword() {
  return (
    <div className={styles.container}>
      <h2>Восстановление пароля</h2>
      <ResetPasswordForm />
    </div>
  );
}
