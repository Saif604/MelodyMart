import Modal from "./modal.styled";
import { closeModal } from "../../features/Modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";
import { useState } from "react";

const ReviewModal = ({handleUpdate,title}) => {
  const dispatch = useDispatch();
  const { show, modalData } = useSelector((store) => store.modal);
  const [formData, setFormData] = useState({
    rating: modalData.rating || "",
    title: modalData.title || "",
    comment: modalData.comment || "",
  });
  
  const handleChange = (data) => {
    setFormData({ ...formData, ...data });
  };
  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    handleUpdate(modalData._id,formData)
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm={6}>
              <Form.Group controlId="form-review-edit" className="mb-3">
                <Form.Label className="fw-semibold">Rating:</Form.Label>
                <Form.Control
                  type="text"
                  name="rating"
                  value={formData.rating}
                  onChange={(e) => handleChange({[e.target.name]:e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="form-review-edit" className="mb-3">
                <Form.Label className="fw-semibold">Title:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) => handleChange({[e.target.name]:e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group controlId="form-review-edit" className="mb-3">
                <Form.Label className="fw-semibold">Comment:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="comment"
                  value={formData.comment}
                  row={20}
                  onChange={(e) => handleChange({[e.target.name]:e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
          <button className="button" type="submit">submit</button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default ReviewModal;
