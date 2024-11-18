import { Field, ErrorMessage } from "formik";
import {Form } from "react-bootstrap";

const TextInput = (props) =>{
    const {name,type,label,placeholder,touched,errors} = props;
    return (
      <Form.Group controlId={`form${name}`} className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Field
          name={name}
          type={type}
          as={Form.Control}
          placeholder={placeholder}
          isInvalid={touched[name] && errors[name]}
        />
        <ErrorMessage name={name} component="div" className="text-danger" />
      </Form.Group>
    );
}
export default TextInput;