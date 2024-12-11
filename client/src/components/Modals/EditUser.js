import Modal from "./modal.styled";
import { closeModal } from "../../features/Modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";
import { useState } from "react";

const EditUser = ({ handleUpdate, isPasswordEdit, updateStatus }) => {
  const dispatch = useDispatch();
  const { show, modalData } = useSelector((store) => store.modal);
  const [formData, setFormData] = useState({
    name: modalData.name,
    email: modalData.email,
  });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (data) => {
    if (!isPasswordEdit) {
      setFormData({ ...formData, ...data });
    } else {
      setPasswords({ ...passwords, ...data });
    }
  };
  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPasswordEdit) {
      handleUpdate(formData);
    } else {
      handleUpdate(passwords);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {!isPasswordEdit ? (
            <Row>
              <Col sm={6}>
                <Form.Group controlId="form-review-edit" className="mb-3">
                  <Form.Label className="fw-semibold">Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      handleChange({ [e.target.name]: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="form-review-edit" className="mb-3">
                  <Form.Label className="fw-semibold">Email:</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      handleChange({ [e.target.name]: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col sm={6}>
                <Form.Group controlId="form-review-edit-old" className="mb-3">
                  <Form.Label className="fw-semibold">Old Password:</Form.Label>
                  <Form.Control
                    type="password"
                    name="oldPassword"
                    value={passwords.oldPassword}
                    onChange={(e) =>
                      handleChange({ [e.target.name]: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="form-review-edit-new" className="mb-3">
                  <Form.Label className="fw-semibold">New Password:</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={(e) =>
                      handleChange({ [e.target.name]: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          )}

          <button
            className="button"
            type="submit"
            disable={
              isPasswordEdit
                ? updateStatus.updateUserPassword.loading
                : updateStatus.updateUser.loading
            }
          >
            submit
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default EditUser;
