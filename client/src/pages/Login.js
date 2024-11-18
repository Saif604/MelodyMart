import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Wrapper from "../assets/wrappers/Login";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../features/User/userSlice";
import { Toast, TextInput } from "../components";
import { closeShow, openShow } from "../features/Toast/toastSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isUser, setIsUser] = useState(false);
  const dispatch = useDispatch();
  const { user, userLoading, userError } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userError) {
      dispatch(openShow({ message: userError, background: "danger" }));
      return;
    }
    if (user) {
      dispatch(
        openShow({
          message: user.msg,
          background: "success",
        })
      );
      setTimeout(() => {
        navigate("/dashboard");
        dispatch((closeShow()));
      }, 3000);
      return;
    }
  }, [userError, user]);

  const toggleUser = () => {
    setIsUser(!isUser);
  };
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
  return (
    <Wrapper>
      <Toast />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, action) => handleFormSubmit(values, action)}
      >
        {({ handleSubmit, errors, touched }) => (
          <Container className="form-container">
            <Form className="mb-3" onSubmit={handleSubmit}>
              {!isUser && (
                <TextInput
                  name="name"
                  type="text"
                  label="Name"
                  placeholder="Enter your name"
                  touched={touched}
                  errors={errors}
                />
              )}
              <TextInput
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                touched={touched}
                errors={errors}
              />
              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                touched={touched}
                errors={errors}
              />
              <Row>
                <button className="btn" type="submit" disabled={userLoading}>
                  submit
                </button>
              </Row>
            </Form>
            {!isUser ? (
              <p>
                Already registered?
                <span className="status" onClick={toggleUser}>
                  Login
                </span>
              </p>
            ) : (
              <p>
                New user?
                <span className="status" onClick={toggleUser}>
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
export default Login;
