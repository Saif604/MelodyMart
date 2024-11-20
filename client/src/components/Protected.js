import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    <div className="page flx-cntr">
      <Spinner animation="grow" variant="secondary" className="loadder" />
    </div>;
    return;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default Protected;
