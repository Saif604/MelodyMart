import React from "react";
import styled from "styled-components";
import { formatPrice } from "../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../features/Orders/ordersSlice";

const CartTotals = () => {
  const { totalAmount, shippingFee, tax, cart } = useSelector(
    (states) => states.cart
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCheckout = () => {
    const orderDetails = { items: cart, tax, shippingFee };
    dispatch(createOrder(orderDetails));
    navigate("/dashboard/checkout");
  };
  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal : <span>{formatPrice(totalAmount)}</span>
          </h5>
          <p>
            shipping fee : <span>{formatPrice(shippingFee)}</span>
          </p>
          <p>
            tax : <span>{formatPrice(tax)}</span>
          </p>
          <hr />
          <h4>
            order total :
            <span>{formatPrice(totalAmount + shippingFee + tax)}</span>
          </h4>
        </article>
        <button className="button" onClick={handleCheckout}>
          proceed to checkout
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--gray-500);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
    text-transform: capitalize;
    margin-bottom: 1rem;
  }
  h4 {
    margin-top: 1rem;
  }
  h4,
  h5 {
    font-weight: 700;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .button {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
