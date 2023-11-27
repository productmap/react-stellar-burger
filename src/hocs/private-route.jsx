import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../store/api/burgers.api";

export function PrivateRoute({ onlyUnAuth = false, component }) {
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const { from } = location.state || { from: { pathname: "/" } };

  // Загрузка данных пользователя
  const { isLoading } = useGetUserQuery();

  // useEffect(() => {
  //   if (currentUser) dispatch(reAuthUser(currentUser));
  // }, [currentUser, dispatch]);

  // Пока загружается показывать загрузчик
  if (isLoading) return "Загружаю...";

  if (onlyUnAuth && user.isAuthenticated) {
    return <Navigate to={from} unstable_viewTransition />;
  }

  // Если неавторизованный по приватному пути
  if (!onlyUnAuth && !user.isAuthenticated && !isLoading) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        unstable_viewTransition
      />
    );
  }

  // Если неавторизованный на авторизацию
  if (onlyUnAuth && !user.isAuthenticated && !isLoading) {
    return component;
  }

  // Для авторизованных
  if (user.isAuthenticated) {
    return component;
  }
}

export function OnlyUnAuth({ component }) {
  return <PrivateRoute onlyUnAuth={true} component={component} />;
}
