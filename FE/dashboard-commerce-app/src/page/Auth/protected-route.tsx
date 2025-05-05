import React from "react";
import { Outlet } from "react-router-dom";
// import { getCookie } from "../../services/cookie";

interface ProtectedRouteProps {
  redirectPath?: string;
}

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = "/login" }) => {
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({}) => {
  // const location = useLocation();
  // const data_user = getCookie("data_user");

  // if (!data_user) {
  //   return <Navigate to={redirectPath} replace state={{ from: location }} />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
