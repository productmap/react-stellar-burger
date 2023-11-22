import styles from "./profile.module.scss";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { logout } from "../../store/user";
import { toast } from "react-toastify";
import { burgersApi } from "../../store/api/burgers.api";


export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    try {
      const resp = dispatch(burgersApi.endpoints.logout());
      console.log(resp)
      navigate("/");
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <>
      <ul className={styles.menu}>
        <li className="text text_type_main-medium">
          <NavLink
            to="/profile"
            unstable_viewTransition
            end
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
          >
            Профиль
          </NavLink>
        </li>
        <li className="text text_type_main-medium">
          <NavLink
            to="/profile/orders"
            unstable_viewTransition
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
          >
            История заказов
          </NavLink>
        </li>
        <li className="text text_type_main-medium">
          <NavLink
            to="/"
            unstable_viewTransition
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
            onClick={handleLogout}
          >
            Выход
          </NavLink>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </li>
      </ul>
      <Outlet />
    </>
  );
}
