import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const AuthRedirect = ({ to }) => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  return <Navigate to={to || from} />;
};

export const UnAuthRedirect = ({ to }) => {
  const location = useLocation();
  return <Navigate to={to || "/login"} state={{ from: location }} />;
};

function Protected({ onlyUnAuth = false, component }) {
  const selectIsAuthenticated = (store) => store.userData.isAuthenticate
  const isAuthenticated = useSelector(selectIsAuthenticated);
  if (onlyUnAuth && isAuthenticated) {
    return <AuthRedirect />;
  }
  if (!onlyUnAuth && !isAuthenticated) {
    return <UnAuthRedirect />;
  }
  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => <Protected onlyUnAuth={true} component={component} />;
