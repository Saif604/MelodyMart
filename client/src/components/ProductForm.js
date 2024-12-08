import styled from "styled-components";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import { Row, Col, Form as BsForm, Button, Spinner } from "react-bootstrap";
import { TextEnter, SelectInput, FileUpload } from "./index";

const COMPANIES = [
  {
    value: "sennheister",
    label: "Sennheister",
  },
  {
    value: "gibson",
    label: "Gibson",
  },
  {
    value: "yamha",
    label: "Yamha",
  },
  {
    value: "kawai",
    label: "Kawai",
  },
];
const CATEGORIES = [
  {
    value: "flue",
    label: "Flue",
  },
  {
    value: "drum",
    label: "Drum",
  },
  {
    value: "guitar",
    label: "Guitar",
  },
  {
    value: "accordion",
    label: "Accordion",
  },
  {
    value: "piano",
    label: "Piano",
  },
];
const ProductForm = ({ initialData, handleSubmit, isLoading, title }) => {
  const initialValues = {
    name: initialData?.name ?? "",
    price: initialData?.price ?? 208,
    description: initialData?.description ?? "",
    category: initialData?.category ?? "",
    company: initialData?.company ?? "",
    featured: initialData?.featured ?? false,
    freeShipping: initialData?.freeShipping ?? true,
    inventory: initialData?.inventory ?? 0,
    colors: initialData?.colors ?? [],
    images: initialData?.images ?? [],
  };

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    price: Yup.number()
      .required("Price is required")
      .min(50, "Price must me atleast 1 rupee")
      .max(1000, "Price must not be more than 10 rupees"),
    company: Yup.string().required("Company is required"),
    inventory: Yup.number()
      .required("Inventory is required")
      .min(1, "Inventory must be atleast one"),
    colors: Yup.array()
      .of(Yup.string().required("Color is required"))
      .min(1, "At least one color is required")
      .max(5, "You can add up to 5 colors only")
      .required("Colors are required"),
    images: Yup.array()
      .of(
        Yup.mixed()
          .required("An image file is required.")
          .test(
            "fileType",
            "Only image files are allowed.",
            (file) =>
              file &&
              ["image/jpeg", "image/png", "image/gif"].includes(file.type)
          )
          .test(
            "fileSize",
            "File size should be less than 5MB.",
            (file) => file && file.size <= 5 * 1024 * 1024
          )
      )
      .required("You must upload exactly 5 images.")
      .length(5, "You must upload exactly 5 images."),
  });
  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={(values, action) => {
          handleSubmit(values);
          action.resetForm();
        }}
      >
        {({ values, handleBlur }) => (
          <Form>
            <h3>{title}</h3>
            <hr />
            <Row>
              <Col sm={12} className="mb-3">
                <Field
                  name="images"
                  component={FileUpload}
                  label="Upload Images"
                  multiple={true}
                  maxFiles={5}
                  onBlur={handleBlur}
                />
              </Col>
              <Col sm={12} md={6} lg={4} className="mb-3">
                <Field
                  component={TextEnter}
                  name="name"
                  label="Name"
                  placeholder="Enter product name"
                  id="name"
                />
              </Col>
              <Col sm={12} md={6} lg={4} className="mb-3">
                <Field
                  component={TextEnter}
                  name="price"
                  type="number"
                  label="Price"
                  placeholder="Enter product Price"
                  id="price"
                />
              </Col>
              <Col sm={12} md={6} lg={4} className="mb-3">
                <Field
                  name="company"
                  component={SelectInput}
                  label="Company"
                  id="company"
                  options={COMPANIES}
                />
              </Col>
              <Col sm={12} md={6} lg={4} className="mb-3">
                <Field
                  name="category"
                  component={SelectInput}
                  label="Category"
                  id="category"
                  options={CATEGORIES}
                />
              </Col>
              <Col sm={12} md={6} lg={4} className="mb-3">
                <Field
                  component={TextEnter}
                  name="inventory"
                  type="text"
                  placeholder="Enter product inventory"
                  label="Inventory"
                  id="inventory"
                />
              </Col>
              <Col
                sm={12}
                md={6}
                lg={4}
                className="mb-3 d-flex align-items-center"
              >
                <div>
                  <Field
                    as={BsForm.Check}
                    name="featured"
                    label="Featured"
                    value={values.featured}
                  />
                  <Field
                    as={BsForm.Check}
                    name="freeShipping"
                    label="Shipping"
                    value={values.freeShipping}
                  />
                </div>
              </Col>
              <Col sm={12} className="mb-3">
                <BsForm.Group controlId="form-colors">
                  <BsForm.Label>Colors</BsForm.Label>
                  <Row>
                    <Col sm={6} md={3} lg={2}>
                      <Field
                        as={BsForm.Check}
                        label="#191970"
                        name="colors"
                        id="colors"
                        value="#191970"
                      />
                    </Col>
                    <Col sm={6} md={3} lg={2}>
                      <Field
                        as={BsForm.Check}
                        label="#50C878"
                        value="#50C878"
                        name="colors"
                        id="colors"
                      />
                    </Col>
                    <Col sm={6} md={3} lg={2}>
                      <Field
                        as={BsForm.Check}
                        label="#FF4500"
                        value="#FF4500"
                        name="colors"
                        id="colors"
                      />
                    </Col>
                    <Col sm={6} md={3} lg={2}>
                      <Field
                        as={BsForm.Check}
                        label="#B76E79"
                        value="#B76E79"
                        name="colors"
                        id="colors"
                      />
                    </Col>
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
            {
              isLoading ? (<Button variant="primary" className="button" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span>Loading...</span>
            </Button>) : (<Button type="submit" className="button">Submit</Button>)
            }
            
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
