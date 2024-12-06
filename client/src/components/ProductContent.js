import styled from "styled-components";
import { MdOutlinePreview } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";


import Stars from "./Stars";
import { formatPrice } from "../utils/format";
import AddToCart from "./AddToCart";

const ProductContent = ({ product,openViewModal,openAddModal }) => {
  const {
    name,
    averageRating,
    numOfReviews,
    _id,
    price,
    description,
    company,
    inventory,
    category,
  } = product;
  return (
    <Wrapper>
      <h2>{name}</h2>
      <Stars ratings={averageRating} reviews={numOfReviews} productId={_id} />
      <p className="price">{formatPrice(price)}</p>
      <p>{description}</p>
      <p className="info">
        <span>SKU:</span>
        {_id}
      </p>
      <p className="info">
        <span>Brand:</span>
        {company}
      </p>
      <p className="info">
        <span>Available:</span>
        {inventory > 0 ? inventory : "Out of stock"}
      </p>
      <p className="info">
        <span>Category:</span>
        {category}
      </p>
      <div className="review-btns">
        <button className="button" onClick={openViewModal}><span><MdOutlinePreview/></span>View</button>
        <button className="button" onClick={openAddModal}><span><MdOutlineRateReview/></span>Add</button>
      </div>
      <hr />
      {inventory > 0 && <AddToCart product={product} />}
    </Wrapper>
  );
};
export default ProductContent;

const Wrapper = styled.div`
  .price {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary-dark-500);
  }
  .info {
    display: flex;
    gap: 1rem;
    text-transform: capitalize;
    margin-bottom: 0.5rem;
    span {
      color: #333;
      font-weight: 700;
    }
  }
  .review-btns{
    display: flex;
    gap: 1rem;
    button{
      letter-spacing: 0;
      padding: 0rem 0.5rem;
      span{
        font-weight: 700;
        font-size: 1.25rem;
        margin-right: 0.25rem;
      }
    }
    button:hover{
      background: var(--primary-dark-400);
    }
  }
`;
