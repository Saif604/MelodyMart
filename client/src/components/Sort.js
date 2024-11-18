import { BsGridFill, BsList } from "react-icons/bs";
import { Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../features/Product/productSlice";
import { updateSort } from "../features/Filter/filterSlice";
const Sort = () => {
  const dispatch = useDispatch();
  const { sort } = useSelector((state) => state.filters);
  const { totalProducts,isGrid } = useSelector((state) => state.products);

  const handleSort = (sortType)=>{
    dispatch(updateSort(sortType));
  }
  const handleView = (isGridView)=>{
    dispatch(setView(isGridView));
  }
  
  return (
    <Row className="mb-3">
      <Col md={4} className="d-flex align-items-center justify-content-between">
        <div className="mb-1">
          <span
            className={`icon ${isGrid ? "active" : ""}`}
            onClick={() => handleView(true)}
          >
            <BsGridFill />
          </span>
          <span
            className={`icon ${!isGrid ? "active" : ""}`}
            onClick={() => handleView(false)}
          >
            <BsList />
          </span>
        </div>
        <div>{`${totalProducts} products found`}</div>
      </Col>
      <Col md={4} className="d-flex align-items-center justify-content-center">
        <div className="line"></div>
      </Col>
      <Col md={4} className="d-flex align-items-center justify-content-between">
        <span>Sort By: </span>
        <Form.Select onChange={(e) => handleSort(e.target.value)} value={sort}>
          <option value="price">Price(Lowest)</option>
          <option value="-price">Price(Highest)</option>
          <option value="name">Name(A-Z)</option>
          <option value="-name">Name(Z-A)</option>
        </Form.Select>
      </Col>
    </Row>
  );
};
export default Sort;
