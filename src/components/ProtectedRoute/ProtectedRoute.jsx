import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function Protected({ onlyUnAuth = false, component }) {
  const isAuthenticated = useSelector((store) => store.userData.isAuthenticated);
  const location = useLocation();
  const from = location.state?.from || '/';
  if (onlyUnAuth && isAuthenticated) {
    return <Navigate to={from} />;
  }
  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => <Protected onlyUnAuth={true} component={component} />;
