import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Row, Col, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { verifyPayment } from "../features/Orders/ordersSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderCheckout, ordersLoading, ordersError } = useSelector(
    (store) => store.orders
  );
  const {name,email}= useSelector((store)=>store.auth.user);

  if (ordersLoading) {
    return (
      <div className="page flx-cntr">
        <Spinner animation="grow" variant="secondary" className="loadder" />
      </div>
    );
  }
  if (ordersError) {
    return <h1>There is some Error....</h1>;
  }
  if (!orderCheckout || !orderCheckout.orderItems.length) {
    return (
      <Wrapper className="page">
        <div className="empty-container">
          <h3>No order to be placed</h3>
          <button
            className="button"
            onClick={() => navigate("/dashboard/products")}
          >
            fill cart
          </button>
        </div>
      </Wrapper>
    );
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_API_KEY,
      amount: orderCheckout?.orderSecrets?.amount,
      currency: orderCheckout?.orderSecrets?.currency,
      name: "MelodyMine",
      description: "Test Transaction",
      image: {},
      order_id: orderCheckout?.orderSecrets?.id,
      handler: async function (response) {
        const paymentData = {
          orderId: orderCheckout?._id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        const result = await dispatch(verifyPayment(paymentData));
        if (verifyPayment.fulfilled.match(result)) {
          navigate("/dashboard/orders");
        }
      },
      prefill: {
        name,
        email,
        contact: "9987393129",
      },
      notes: {
        address: "F87,Gulluk Bazar, Mehandi Nagar, Osaka - A8901",
      },
      theme: {
        color: "#3b0853",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <Wrapper className="page">
      <div className="checkout-container">
        <h4>Order Details: </h4>
        <hr />
        <Row>
          <Col>
            <p>
              <span>User: </span> {orderCheckout?.user?.name}
            </p>
          </Col>
          <Col>
            <p>
              <span>Amount: </span> {orderCheckout?.total}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Test Card: </h5>
            <hr />
            <p>
              <span>Card: </span>5267 3181 8797 5449
            </p>
            <p>
              <span>Expiry: </span>05/
              {(new Date().getFullYear() + 1).toString().slice(-2)}
            </p>
            <p>
              <span>CVV: </span>813
            </p>
          </Col>
          <Col>
            <h5>UPI: </h5>
            <hr />
            <p>
              <span>Id: </span>test@upi
            </p>
          </Col>
        </Row>
        <button className="button" onClick={displayRazorpay}>
          pay now
        </button>
      </div>
    </Wrapper>
  );
};
export default Checkout;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty-container {
    text-align: center;
  }
  .checkout-container {
    padding: 1rem;
    background: var(--primary-dark-100);
    border-radius: var(--radius);
    box-shadow: var(--dark-shadow);
    border: 1px solid var(--gray-400);
    width: 400px;
  }
  span {
    color: var(--dark);
    font-weight: 600;
    margin-right: 0.5rem;
  }
  h5 {
    font-weight: 600;
    letter-spacing: 1px;
  }
`;
