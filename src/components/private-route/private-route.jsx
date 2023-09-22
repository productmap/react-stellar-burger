import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkUserAuth, setUser } from "../../store/user";
import { useGetUserQuery } from "../../store/api/burgers.api";

export function PrivateRoute({ onlyUnAuth = false, component }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const { data: currentUser, isSuccess, isError, error } = useGetUserQuery();


  useEffect(() => {
      if (isSuccess) {
    console.log(currentUser, error);
    //     // dispatch(setUser(currentUser))
      }
  }, [currentUser, error, isSuccess]);

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
