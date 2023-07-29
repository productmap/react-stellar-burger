import {
  BurgerIcon,
  Button,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.scss";

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={`${styles.header__left} pt-6 pb-4`}>
        <div>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={`${styles.header__button} pr-5 pl-5 mr-2 text_color_primary`}
          >
            <BurgerIcon type="primary" />
            Конструктор
          </Button>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={`${styles.header__button} pr-5 pl-5 text_color_inactive`}
          >
            <ListIcon type="secondary" />
            Лента заказов
          </Button>
        </div>

        <Logo className={styles.header__center} />

        <div className={styles.header__right}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={`${styles.header__button} pr-5 pl-5 text_color_inactive`}
          >
            <ProfileIcon type="secondary" />
            Личный кабинет
          </Button>
        </div>
      </nav>
    </header>
  );
}
