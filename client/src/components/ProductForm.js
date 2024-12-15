import styled from "styled-components";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import { Row, Col, Form as BsForm, Spinner } from "react-bootstrap";
import { TextEnter, SelectInput, FileUpload } from "./index";
import { formData } from "../utils/products";

const ProductForm = ({ initialData, handleSubmit, isLoading, title }) => {
  const initialValues = {
    name: initialData?.name ?? "",
    price: initialData?.price ?? 208,
    description: initialData?.description ?? "",
    category: initialData?.category ?? "flute",
    company: initialData?.company ?? "sennheister",
    featured: initialData?.featured ?? false,
    freeShipping: initialData?.freeShipping ?? true,
    inventory: initialData?.inventory ?? 1,
    colors: initialData?.colors ?? [],
    images: initialData?.images?.map(({ url }) => url) ?? [],
  };

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    price: Yup.number()
      .required("Price is required")
      .min(50, "Price must me atleast 1 rupee")
      .max(1000, "Price must not be more than 10 rupees"),
    inventory: Yup.number()
      .required("Inventory is required")
      .min(1, "Inventory must be atleast one"),
    colors: Yup.array()
      .of(Yup.string().required("Color is required"))
      .min(1, "At least one color is required")
      .max(5, "You can add up to 5 colors only")
      .required("Colors are required"),
    description: Yup.string().required("Product description is required"),
    images: Yup.array()
      .required("You must upload exactly 5 images.")
      .length(5, "You must upload exactly 5 images."),
  });
  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={(values, {resetForm}) => {
          handleSubmit(values,resetForm);
        }}
      >
        {({ values, isSubmitting,errors,touched}) => (
          <Form>
            <h4>{title}</h4>
            <hr />
            <Row>
              <Col sm={12} className="mb-3">
                <Field
                  name="images"
                  component={FileUpload}
                  multiple={true}
                />
              </Col>
              {formData.input.map((item, index) => (
                <Col sm={12} md={6} lg={4} className="mb-3" key={index}>
                  <Field
                    component={TextEnter}
                    name={item.name}
                    label={item.label}
                    placeholder={item.placeholder}
                    id={item.id}
                  />
                </Col>
              ))}
              {formData.select.map((item, index) => (
                <Col sm={12} md={6} lg={4} className="mb-3" key={index}>
                  <Field
                    name={item.name}
                    component={SelectInput}
                    label={item.label}
                    id={item.id}
                    options={item.options}
                  />
                </Col>
              ))}
              <Col
                sm={12}
                md={6}
                lg={4}
                className="mb-3 d-flex align-items-center"
              >
                <div>
                  {formData.checkbox.map((item, index) => (
                    <Field
                      as={BsForm.Check}
                      name={item.name}
                      label={item.label}
                      checked={values[item.name]}
                      key={index}
                    />
                  ))}
                </div>
              </Col>
              <Col sm={12} className="mb-3">
                <BsForm.Group controlId="form-colors">
                  <BsForm.Label>Colors</BsForm.Label>
                  <Row>
                    {formData.checks.map((item, index) => (
                      <Col sm={6} md={3} key={index}>
                        <Field
                          as={BsForm.Check}
                          label={item.label}
                          name={item.name}
                          id={item.id}
                          value={item.value}
                          checked={values.colors.includes(item.value)}
                        />
                      </Col>
                    ))}
                    {
                      touched["colors"] && !!errors["colors"] && <p className="text-danger">{errors["colors"]}</p>
                    }
                  </Row>
                </BsForm.Group>
              </Col>
              <Col className="mb-3">
                <BsForm.Group controlId="form-textarea">
                  <BsForm.Label>Description</BsForm.Label>
                  <Field
                    name="description"
                    rows={3}
                    as="textarea"
                    placeholder="Enter product description"
                    className="form-control"
                    label="Description"
                  />
                </BsForm.Group>
              </Col>
            </Row>
            {isLoading || isSubmitting ? (
              <button variant="primary" className="button" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span>Loading...</span>
              </button>
            ) : (
              <button type="submit" className="button">
                Submit
              </button>
            )}
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default ProductForm;

const Wrapper = styled.section`
  padding: 3rem 2rem;
  box-shadow: var(--dark-shadow);
  background: var(--light);
  border-radius: 0.5rem;

  form {
    h3 {
      text-transform: capitalize;
      font-family: var(--ff-2);
      letter-spacing: 0;
      margin-bottom: 0;
    }
  }
`;
