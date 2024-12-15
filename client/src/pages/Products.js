import styled from "styled-components";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { getAllProducts } from "../features/Products/productsSlice";
import { useNavigate } from "react-router-dom";

import { Filters, Sort, ProductList} from "../components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, filters, sort, page } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    const { name, category, company, freeShipping, colors, price } = filters;
    let queryObj = { sort, page: page };
    if (name) queryObj.name = name;
    if (category) queryObj.category = category;
    if (company) queryObj.company = company;
    if (freeShipping) queryObj.freeShipping = freeShipping;
    if (colors && colors.length > 0) queryObj.colors = colors.join(",");
    if (price) queryObj.numericFilters = `price<=${price}`;
    const params = new URLSearchParams(queryObj).toString();
    navigate(`?${params}`);

    dispatch(getAllProducts(params));
  }, [dispatch, filters, sort, page, navigate]);

  if (status.getAllProducts.loading) {
    return (
      <div className="page flx-cntr">
        <Spinner animation="grow" variant="secondary" className="loadder" />
      </div>
    );
  }
  if (status.getAllProducts.error) {
    return (
      <div className="page flx-cntr">
        <h3>There is some error...</h3>
      </div>
    );
  }

  return (
    <Wrapper className="page">
      <Row>
        <Col sm={3} md={4} lg={3} xl={2} className="filter">
          <Filters />
        </Col>
        <Col sm={9} md={8} lg={9} xl={10}>
          <Row className="sort">
            <Sort />
          </Row>
          <div className="product-container">
            <ProductList />
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
};
export default Products;

const Wrapper = styled(Container)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  background: #fff;
  border-radius: 0.25rem;
  box-shadow: var(--light-shadow);
  .filter{
    background: #f8f8f8;
    box-shadow: var(--light-shadow);
    padding: 1rem;
  }
  .sort{
    padding:0.5rem;
    background:#f8f8f8;
    box-shadow: var(--light-shadow);
    margin-bottom: 1rem;
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
