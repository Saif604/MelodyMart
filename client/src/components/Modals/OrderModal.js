import { Row, Col } from "react-bootstrap";
import Modal from "./modal.styled";
import { useDispatch, useSelector } from "react-redux";
import { TbEdit } from "react-icons/tb";
import { setCheckoutOrder } from "../../features/Orders/ordersSlice";
import { useNavigate } from "react-router-dom";

const OrderModal = ({ closeModal }) => {
  const { show, modalData } = useSelector((states) => states.modal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    _id: orderId,
    total: orderTotal,
    orderItems,
    status,
    createdAt,
    updatedAt,
    paymentId
  } = modalData;

  const handleCheckout = (order) =>{
    dispatch(setCheckoutOrder(order));
    navigate("/dashboard/checkout");
  }

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <p className="fw-bolder fs-5 text-muted mb-1">Order Items: </p>
          {orderItems?.map(({ _id,image, name }) => (
            <Col className="mb-3" sm={3} key={_id}>
              <img
                src={image}
                alt={name}
                className="image-fit order-img"
                style={{ height: "5rem" }}
              />
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <span className="fw-bolder text-muted">Order Id:</span>
            <p>{orderId}</p>
          </Col>
          <Col>
            <span className="fw-bolder text-muted">Order Total:</span>
            <p>{orderTotal}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="fw-bolder text-muted">Status:</span>
            <p>
              {status}
              {status === "pending" && (
                <span
                  className="fw-bolder fs-5 ms-2 btn"
                  onClick={() => handleCheckout(modalData)}
                >
                  <TbEdit />
                </span>
              )}
            </p>
          </Col>
          <Col>
            <span className="fw-bolder text-muted">Payment Id:</span>
            <p>{paymentId}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="fw-bolder text-muted">Created At:</span>
            <p>{createdAt}</p>
          </Col>
          <Col>
            <span className="fw-bolder text-muted">Updated At:</span>
            <p>{updatedAt}</p>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default OrderModal;
