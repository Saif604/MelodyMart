import React from "react";
import { Row, Col } from "react-bootstrap";
import { GridItem } from "./index";
import { useSelector } from "react-redux";
import { formatPrice } from "../utils";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const ProductList = () => {
  const navigate = useNavigate();
  const { products, isGrid } = useSelector((state) => state.products);
  if(products.length < 1){
    return <p className="text-danger">Sorry, no product found</p>
  }
  return (
    <Row className="mb-3 g-3">
      {isGrid
        ? products.map((product) => (
            <Col md={6} lg={4} key={product._id}>
              <GridItem name={product.name} {...product} />
            </Col>
          ))
        : products.map((product) => (
            <ListItem key={product._id} className="g-2">
              <Col md={4} className="image-container">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="image-fit"
                />
              </Col>
              <Col md={8}>
                <h4 className="fs-5 fw-bold text-dark mb-1">{product.name}</h4>
                <span className="fw-bold text-muted mb-2">
                  {formatPrice(product.price)}
                </span>
                <p>{product.description}</p>
                <button
                  className="button mb-3"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  details
                </button>
              </Col>
            </ListItem>
          ))}
    </Row>
  );
};
export default ProductList;

const ListItem = styled(Row)`
  .image-container{
    height:13rem;
    overflow: hidden;
  }
`