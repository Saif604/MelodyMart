import Wrapper from "../assets/wrappers/Login";
import { Container } from "react-bootstrap";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../features/Authenticate/authSlice";
const Logger = ({ children }) => {
  const [isUser, setIsUser] = useState(
    window.location.pathname === "/login" ? true : false
  );
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [navigate, user]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    name: !isUser
      ? Yup.string()
          .min(3, "Name must be at least 3 characters")
          .max(30, "Name must be 30 characters or less")
          .required("Name is required")
      : Yup.string(),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleFormSubmit = (values, action) => {
    const { resetForm } = action;
    if (!isUser) {
      dispatch(registerUser({ ...values }));
      resetForm();
      return;
    }
    dispatch(loginUser({ ...values }));
    resetForm();
  };
  const handleLogin = () => {
    setIsUser(true);
    navigate("/login");
  };
  const handleRegister = () => {
    setIsUser(false);
    navigate("/register");
  };
  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, action) => handleFormSubmit(values, action)}
      >
        {({ handleSubmit, errors, touched }) => (
          <Container className="form-container">
            {children({ handleSubmit, errors, touched,isLoading })}
            {!isUser ? (
              <p className="mb-0 mt-1">
                Already registered?
                <span className="status" onClick={handleLogin}>
                  Login
                </span>
              </p>
            ) : (
              <p className="mb-0 mt-1">
                New user?
                <span className="status" onClick={handleRegister}>
                  Register
                </span>
              </p>
            )}
          </Container>
        )}
      </Formik>
    </Wrapper>
  );
};
export default Logger;
