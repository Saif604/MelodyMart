import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleProtected = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default RoleProtected;
