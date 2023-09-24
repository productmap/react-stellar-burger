import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../store/api/burgers.api";

export function PrivateRoute({ onlyUnAuth = false, component }) {
  const location = useLocation();
  // const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  // Загрузка авторизованного пользователя
  const {
    data: currentUser,
    isSuccess,
    isError,
    error: authError,
    isLoading,
  } = useGetUserQuery();

  useEffect(() => {
    if (isSuccess) console.log(currentUser);
  }, [currentUser, isSuccess]);

  useEffect(() => {
    if (isError) console.log(authError);
  }, [isError, authError]);

  // Пока загружается показывать загрузчик
  if (isLoading) return "Загружаю...";

  // Если неавторизованный по приватному пути
  if (!onlyUnAuth && !user.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Если неавторизованный на авторизацию
  if (onlyUnAuth && !user.isAuthenticated) {
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
