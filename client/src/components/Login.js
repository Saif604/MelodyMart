import { Row, Spinner } from "react-bootstrap";
import { TextInput } from "../components";
import { Form } from "formik";
const Login = ({ handleSubmit, touched, errors, isLoading }) => {
  return (
    <Form onSubmit={handleSubmit}>
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
        <button className="button" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <span>Submit</span>
          )}
        </button>
      </Row>
    </Form>
  );
};
export default Login;
