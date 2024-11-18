import styled from "styled-components";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { getAllProducts } from "../features/Product/productSlice";
import {useNavigate} from "react-router-dom";

import { Filters, Sort, ProductList, Pagination } from "../components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productsLoading, productsError } = useSelector(
    (state) => state.products
  );
  const {filters,sort,page} = useSelector((state) => state.filters);

  useEffect(() => {
    const {name,category,company,freeShipping,colors,price} = filters;
    let queryObj = {sort,page:page};
    if(name) queryObj.name = name;
    if(category) queryObj.category = category;
    if(company) queryObj.company = company;
    if(freeShipping) queryObj.freeShipping = freeShipping;
    if(colors && colors.length > 0) queryObj.colors = colors.join(",");
    if(price) queryObj.numericFilters = `price<=${price}`;
    const params = new URLSearchParams(queryObj).toString();
    navigate(`?${params}`);
    
    dispatch(getAllProducts(params));
  }, [dispatch, filters,sort,page]);

  if (productsLoading) {
    return (
      <div className="page flx-cntr">
        <Spinner animation="grow" variant="secondary" className="loadder" />
      </div>
    );
  }
  if (productsError) {
    return (
      <div className="page flx-cntr">
        <h3>{JSON.stringify(productsError)}</h3>
      </div>
    );
  }

  return (
    <Wrapper>
      <Container>
        <Row className="cstm-row">
          <Col sm={2} className="mb-3">
            <Filters />
          </Col>
          <Col sm={10}>
            <Container fluid>
              <Sort />
              <ProductList />
              <Pagination />
            </Container>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};
export default Products;

const Wrapper = styled.main`
  .cstm-row {
    min-height: calc(100vh - var(--nav-height));
    margin: 1rem 0;
  }
  .colors {
    display: flex;
    gap: 0.5rem;
  }
  .line {
    width: 100%;
    height: 1px;
    background: var(--gray-500);
  }
  .icon {
    font-size: 1rem;
    font-weight: bold;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    margin-right: 0.25rem;
    border: 1px solid var(--primary-dark-500);
    border-radius: var(--radius);
    cursor: pointer;
  }
  .icon.active {
    background: var(--dark);
    color: var(--light);
  }
`;
