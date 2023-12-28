import styles from "./error-page.module.scss";
import logo from "../../assets/images/burger-animated.svg";
import AppHeader from "../../components/app-header/app-header";

export default function ErrorPage() {
  return (
    <>
      <AppHeader />
      <div className={styles.wrapper}>
        <div className={styles.column}>
          <h1 className={styles.errorHeader}>Опаа...!</h1>
          <p className={styles.errorMessage}>Что-то бургер зажевало</p>
          {/*<p className={styles.errorCode}>{error.status}</p>*/}
        </div>
        <div className={styles.column}>
          <img src={logo} className={styles.errorImage} alt="Stellar Burgers" />
        </div>
      </div>
    </>
  );
}
