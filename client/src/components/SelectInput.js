import React from "react";
import { Form } from "react-bootstrap";

const SelectInput = ({
  label,
  id,
  options,
  value,
  onBlur,
  name,
  field,
  form: { touched, errors },
  ...rest
}) => {
  return (
    <Form.Group>
      {label && <Form.Label htmlFor={id}>{label}</Form.Label>}
      <Form.Control
        as="select" 
        {...rest}
        {...field} 
        onBlur={onBlur}
        value={value}
        name={name}
        id={id}
        isInvalid={touched[field.name] && !!errors[field.name]} 
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Control>
      {touched[field.name] && errors[field.name] ? (
        <Form.Control.Feedback type="invalid">
          {errors[field.name]} 
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
};

export default SelectInput;
