import {
  BurgerIcon,
  Button,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "./app-header.scss";

export default function AppHeader() {
  return (
    <header className="header">
      <nav className="header__nav pt-6 pb-4">
        <div>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="pr-5 pl-5 mr-2 text_color_primary header__button"
          >
            <BurgerIcon type="primary" />
            Конструктор
          </Button>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="pr-5 pl-5 text_color_inactive header__button"
          >
            <ListIcon type="secondary" />
            Лента заказов
          </Button>
        </div>

        <Logo className="header__logo" extraClass="header__logo" />

        <div className="header__nav-right">
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="pr-5 pl-5 text_color_inactive header__button"
          >
            <ProfileIcon type="secondary" />
            Личный кабинет
          </Button>
        </div>
      </nav>
    </header>
  );
}
