import { useParams } from "react-router-dom";
import { Row, Col, Spinner, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  createReview,
  getSingleProduct,
  getSingleProductReviews,
} from "../features/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { ProductContent, ProductImages } from "../components";
import { ViewReview, ReviewModal } from "../components/Modals";
import { closeModal, openModal } from "../features/Modal/modalSlice";

const SingleProduct = () => {
  const [isView, setIsView] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, isError, product, reviews, totalReviews } = useSelector(
    (state) => state.product
  );
  const { show } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(getSingleProduct(id));
    dispatch(getSingleProductReviews(id));
  }, [dispatch, id]);

  const openViewModal = () => {
    setIsView(true);
    dispatch(openModal({ reviews, totalReviews }));
  };
  const openAddModal = () => {
    setIsView(false);
    dispatch(openModal({ _id:id }));
  };

  const handleAddReview = (productId,reviewData) =>{
    dispatch(createReview({...reviewData, product:productId})).then(()=>{
      dispatch(getSingleProduct(id));
      dispatch(getSingleProductReviews(id));
      dispatch(closeModal())
    }).catch((err)=>console.error(err));
  }

  if (isLoading)
    return (
      <div className="page flx-cntr">
        <Spinner animation="grow" variant="secondary" className="loadder" />
      </div>
    );
  if (isError) return <h3>There is some error</h3>;

  return (
    <Container fluid>
      <Row className="page g-3">
        <Col lg={6}>
          <ProductImages images={product.images} />
        </Col>
        <Col lg={6}>
          <ProductContent
            product={product}
            openViewModal={openViewModal}
            openAddModal={openAddModal}
          />
        </Col>
      </Row>
      {show && isView && <ViewReview />}
      {show && !isView && <ReviewModal handleUpdate={handleAddReview} title={"Add Review"}/>}
    </Container>
  );
};
export default SingleProduct;
