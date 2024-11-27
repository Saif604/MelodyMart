import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Row, Col, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { getSingleProduct, getSingleProductReviews } from "../features/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, ProductImages, Stars } from "../components";
import { formatPrice } from "../utils";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, isError, product } = useSelector((state) => state.product);
  
  useEffect(() => {
    dispatch(getSingleProduct(id));
    dispatch(getSingleProductReviews(id));
  }, [dispatch, id]);
  if (isLoading)
    return (
      <div className="page flx-cntr">
        <Spinner animation="grow" variant="secondary" className="loadder" />
      </div>
    );
  if (isError) return <h3>There is some error</h3>;

  const {
    name,
    price,
    numOfReviews,
    averageRating,
    category,
    company,
    colors,
    description,
    images,
    inventory,
    _id,
  } = product;
  return (
    <Wrapper>
      <Row className="section section-center page g-3">
        <Col lg={6}>
          <ProductImages images={images} />
        </Col>
        <Col lg={6}>
          <h2>{name}</h2>
          <Stars ratings={averageRating} reviews={numOfReviews} productId={_id}/>
          <p className="price">{formatPrice(price)}</p>
          <p>{description}</p>
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
          <p className="info">
            <span>SKU:</span>
            {_id}
          </p>
          <hr />
          {inventory > 0 && (<AddToCart product={product}/>)}
        </Col>
      </Row>
    </Wrapper>
  );
};
export default SingleProduct;

const Wrapper = styled.main`
  background: var(--gray-100);
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
      font-weight: 500;
    }
  }
`;
