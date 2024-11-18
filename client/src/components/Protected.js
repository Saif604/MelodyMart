import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user, userLoading } = useSelector((state) => state.user);

  if (userLoading) {
    <h1>Loading....</h1>;
    return;
  }
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default Protected;
