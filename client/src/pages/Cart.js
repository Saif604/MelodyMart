import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CartContent} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { countCartTotal } from "../features/Cart/cartSlice";

const Cart = () => {
  const {cart} = useSelector((states)=>states.cart);
  const dispatch = useDispatch();
  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart));
    dispatch(countCartTotal());
  },[cart,dispatch]);
  
  if (cart.length < 1) {
    return (
      <Wrapper className="page empty-content">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <Link to="/products" className="button">
            fill it
          </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <main>
      <Wrapper className="page">
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  &.empty-content{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default Cart;
