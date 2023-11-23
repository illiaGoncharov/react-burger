import { Navigate, useLocation } from "react-router-dom";

import { useSelector } from "../services/types/hooks";
import { TComponentProps, TProtectedRouteProps } from "../utils/types";

const Protected = ({ onlyUnAuth = false, component }: TProtectedRouteProps) => {
  const location = useLocation();

  // Проверка аутентификации пользователя
  const isAuthenticated = useSelector((store) => store.auth.isAuthChecked);
  // Получение данных пользователя
  const user = useSelector((store) => store.auth.user);

  // Возвращаем null, если пользователь не аутентифицирован
  return !isAuthenticated ? null : // Если требуется только неаутентифицированный пользователь и пользователь аутентифицирован, выполняем перенаправление
  onlyUnAuth && user ? (
    <Navigate
      to={(location.state || { from: { pathname: "/" } }).from}
      replace
    />
  ) : // Если требуется только аутентифицированный пользователь и пользователь не аутентифицирован, выполняем перенаправление на страницу входа
  !onlyUnAuth && !user ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : (
    component
  );
};

// Обертка для защищенных маршрутов, доступных только аутентифицированным пользователям
export const OnlyAuth = Protected;

// Обертка для защищенных маршрутов, доступных только неаутентифицированным пользователям
export const OnlyUnAuth = ({ component }: TComponentProps) => (
  <Protected onlyUnAuth={true} component={component} />
);
