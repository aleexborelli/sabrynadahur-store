import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAdminLoggedIn } from "../../services/adminAuth";

export default function AdminGuard() {
  const location = useLocation();
  return isAdminLoggedIn()
    ? <Outlet />
    : <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
}
