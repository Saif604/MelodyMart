import { useState } from "react";
import styled from "styled-components";
import {FaCheck} from "react-icons/fa";
import { Link } from "react-router-dom";
import { addToCart } from "../features/Cart/cartSlice";
import { useDispatch } from "react-redux";
import AmountButtons from "./AmountButtons";

const AddToCart = ({product}) => {
  const {id,colors,stocks} = product;
  const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();

   const increase = () => {
     setAmount((oldAmount) => {
       let tempAmount = oldAmount + 1;
       if (tempAmount > stocks) tempAmount = stocks;
       return tempAmount;
     });
   };
   const decrease = () => {
     setAmount((oldAmount) => {
       let tempAmount = oldAmount - 1;
       if (tempAmount < 1) tempAmount = 1;
       return tempAmount;
     });
   };

  return (
    <Wrapper>
      <div className="colors">
        <span>colors : </span>
        <div>
          {colors?.map((currColor, index) => {
            return (
              <button
                key={index}
                className={
                  color === currColor ? "color-btn active" : "color-btn"
                }
                style={{ background: currColor }}
                onClick={() => {
                  setColor(currColor);
                }}
              >
                {color === currColor ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <Link
          to="/dashboard/cart"
          className="button"
          onClick={() => {
            dispatch(addToCart({ ...product, color, amount,product:id}));
          }}
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
}
export default AddToCart;

const Wrapper = styled.div`
  margin-top: 1rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--light);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 150px;
  }
`;