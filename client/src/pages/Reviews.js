import { ReviewCard } from "../components";
import { Row, Col } from "react-bootstrap";
import { ReviewModal } from "../components/Modals";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteReview, getCurrentUserReviews, updateReview } from "../features/Review/reviewSlice";
import { Spinner } from "react-bootstrap";
import { closeModal, openModal } from "../features/Modal/modalSlice";

const Reviews = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, reviews, totalReviews} = useSelector(
    (store) => store.reviews
  );
  const {show} = useSelector((store)=>store.modal);

  useEffect(() => {
    dispatch(getCurrentUserReviews());
  }, [dispatch]);

  const handleEdit=(review)=>{
    dispatch(openModal(review));
  }
  const handleDelete = (id) =>{
    dispatch(deleteReview(id)).then(()=>{
      dispatch(getCurrentUserReviews());
    }).catch((err)=>{console.error(err)})
  }

  const handleUpdate=(reviewId,reviewData)=>{
    dispatch(updateReview({reviewId,reviewData})).then(()=>{
      dispatch(getCurrentUserReviews());
      dispatch(closeModal());
    }).catch((err)=>{console.error(err)})
  }

  if (isLoading) {
    return (
      <div className="page flx-cntr">
        <Spinner animation="grow" className="loadder" />
      </div>
    );
  }
  if (isError) {
    return <h3>There is some error...</h3>;
  }
  if (!totalReviews) {
    return <h3>No reviews available</h3>;
  }

  return (
    <div>
      <div>
        <h4>Reviews:</h4>
        <hr />
      </div>
      <Row className="g-3">
        {reviews.map((review, index) => (
          <Col md={6} xl={4} key={index}>
            <ReviewCard review={review} sno={index + 1} onEdit={handleEdit} onDelete={handleDelete}/>
          </Col>
        ))}
      </Row>
      {
        show && (<ReviewModal handleUpdate={handleUpdate} title={"Edit Review"}/>)
      }
      
    </div>
  );
};
export default Reviews;
