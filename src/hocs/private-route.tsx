import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetUserQuery } from "../store/api/burgers.api";
import { useAppSelector } from "../hooks/hooks";

type TPrivateRoute = {
  onlyUnAuth?: boolean;
  component: ReactElement;
};

type TOnlyUnAuth = {
  component: ReactElement;
};

export function PrivateRoute({ onlyUnAuth = false, component }: TPrivateRoute) {
  const location = useLocation();
  const user = useAppSelector((store) => store.user);
  const { from } = location.state || { from: { pathname: "/" } };

  // Загрузка данных пользователя
  const { isLoading } = useGetUserQuery(undefined);

  // useEffect(() => {
  //   if (currentUser) dispatch(reAuthUser(currentUser));
  // }, [currentUser, dispatch]);

  // Пока загружается показывать загрузчик
  if (isLoading)
    return (
      <>
        <p>"Загружаю..."</p>
      </>
    );

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

  return null
}

export function OnlyUnAuth({ component }: TOnlyUnAuth): ReactElement {
  return <PrivateRoute onlyUnAuth={true} component={component} />;
}
