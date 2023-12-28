import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.scss";
import { Link, NavLink } from "react-router-dom";

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={`${styles.header__left} pt-6 pb-4`}>
        <div>
          <NavLink
            end
            to="/"
            unstable_viewTransition
            className={({ isActive }) =>
              `${styles.link} pr-5 pl-5 mr-2 text_color_inactive ${
                isActive ? styles.active : ""
              }`
            }
          >
            <BurgerIcon type="secondary" />
            Конструктор
          </NavLink>
          <NavLink
            to="/feed"
            unstable_viewTransition
            className={({ isActive }) =>
              `${styles.link} pr-5 pl-5 text_color_inactive ${
                isActive ? styles.active : ""
              }`
            }
          >
            <ListIcon type="secondary" />
            Лента заказов
          </NavLink>
        </div>

        <Link to="/" unstable_viewTransition>
          <Logo />
        </Link>

        <div className={styles.header__right}>
          <NavLink
            to="/profile"
            unstable_viewTransition
            className={({ isActive }) =>
              `${styles.link} pr-5 pl-5 text_color_inactive ${
                isActive ? styles.active : ""
              }`
            }
          >
            <ProfileIcon type="secondary" />
            Личный кабинет
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
