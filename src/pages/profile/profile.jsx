import styles from "./profile.module.scss";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { logout } from "../../store/user";
import { toast } from "react-toastify";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    try {
      dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error(error || error.data.message);
    }
  }

  return (
    <>
      <ul className={styles.menu}>
        <li className="text text_type_main-medium">
          <NavLink to="">Профиль</NavLink>
        </li>
        <li className="text text_type_main-medium">
          <NavLink to="orders">История заказов</NavLink>
        </li>
        <li className="text text_type_main-medium">
          <NavLink to="" onClick={handleLogout}>
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
