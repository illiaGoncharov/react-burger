import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function RedirectUserToLogin() {
  const location = useLocation();
  return <Navigate to="/login" state={{ from: location }} />;
}
function Protected({ onlyUnAuth = false, component }) {
  const selectIsAuthenticated = (store) => store.userData.isAuthenticate
  const isAuthenticated = useSelector(selectIsAuthenticated);
  if (onlyUnAuth && isAuthenticated) {
    return <RedirectUserToLogin />;
  }
  if (!onlyUnAuth && !isAuthenticated) {
    return <RedirectUserToLogin />;
  }
  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => <Protected onlyUnAuth={true} component={component} />;
