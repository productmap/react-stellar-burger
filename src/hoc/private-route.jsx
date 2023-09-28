import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reAuthUser } from "../store/user";
import { useGetUserQuery } from "../store/api/burgers.api";

export function PrivateRoute({ onlyUnAuth = false, component }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const { from } = location.state || { from: { pathname: "/" } };

  // Загрузка данных пользователя
  const { data: currentUser, isLoading } = useGetUserQuery();

  useEffect(() => {
    if (currentUser) dispatch(reAuthUser(currentUser));
    // navigate(location.state?.from?.pathname);
  }, [currentUser, dispatch, location, navigate]);

  // Пока загружается показывать загрузчик
  if (isLoading) return "Загружаю...";

  if (onlyUnAuth && user.isAuthenticated) {
    return <Navigate to={from} />;
  }

  // Если неавторизованный по приватному пути
  if (!onlyUnAuth && !user.isAuthenticated && !isLoading) {
    return <Navigate to="/login" state={{ from: location }} />;
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
