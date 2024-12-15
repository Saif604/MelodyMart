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
          <h5>Order Items: </h5>
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
            <h6 className="mb-1">Order Id:</h6>
            <p>{orderId}</p>
          </Col>
          <Col>
            <h6 className="mb-1">Order Total:</h6>
            <p>{orderTotal}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 className="mb-1">Status:</h6>
            <p className="text-capitalize">
              {status}
              {status === "pending" && (
                <span
                  className="fw-bolder fs-5 ms-2 btn btn-light p-0"
                  onClick={() => handleCheckout(modalData)}
                >
                  <TbEdit />
                </span>
              )}
            </p>
          </Col>
          <Col>
            <h6 className="mb-1">Payment Id:</h6>
            <p>{paymentId}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 className="mb-1">Created At:</h6>
            <p>{createdAt}</p>
          </Col>
          <Col>
            <h6 className="mb-1">Updated At:</h6>
            <p>{updatedAt}</p>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default OrderModal;
