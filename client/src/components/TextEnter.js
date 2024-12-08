import {Form} from "react-bootstrap";

const TextEnter = ({
  label,
  type="text",
  id,
  readonly,
  placeholder,
  field,
  form: { touched, errors },
  ...rest
}) => {
  return (
    <Form.Group>
      {label && <Form.Label htmlFor={id}>{label}</Form.Label>}
      <Form.Control
        {...rest}
        {...field} //includes name,value,onBlur,onChange
        isInvalid={touched[field.name] && !!errors[field.name]}
        readOnly={readonly}
        placeholder={placeholder}
        type={type}
        id={id}
      />
      {touched[field.name] && errors[field.name] ? (
        <Form.Control.Feedback type="invalid">
          {errors[field.name]}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
};

export default TextEnter;
