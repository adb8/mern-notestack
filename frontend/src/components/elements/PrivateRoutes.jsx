import { Navigate, Outlet } from "react-router-dom";
import auth from "../../auth";

const PrivateRoutes = () => {
  return auth.isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
