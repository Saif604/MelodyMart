import Modal from "./modal.styled";
import { closeModal } from "../../features/Modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const ViewReview = () => {
  const dispatch = useDispatch();
  const { show, modalData } = useSelector((states) => states.modal);
  const { singleProductReviews, singleProductTotalReviews } = modalData;
  const handleClose = () => {
    dispatch(closeModal());
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reviews</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Wrapper>
          <h4>
            Review Count:
            <span className="text-muted">{singleProductTotalReviews ?? 0}</span>
          </h4>
          {singleProductTotalReviews < 1 && (
            <h5 className="text-muted">No review are present on this product</h5>
          )}
          {singleProductReviews?.map(
            ({ title, comment, user: { name }, _id }) => (
              <div key={_id} className="review">
                <div className="avatar-container">
                  <div className="avatar">
                    <span>{name.slice(0, 1)}</span>
                  </div>
                  <span className="avatar-name">{name}</span>
                </div>
                <div className="review-contents">
                  <p className="review-title">{title}</p>
                  <p className="review-text">{comment}</p>
                </div>
              </div>
            )
          )}
        </Wrapper>
      </Modal.Body>
    </Modal>
  );
};

export default ViewReview;

const Wrapper = styled.div`
  .avatar-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    .avatar-name {
      font-weight: 500;
      font-size: 1rem;
      text-transform: capitalize;
      color: var(--dark);
    }
  }
  .avatar {
    width: 1.5rem;
    height: 1.5rem;
    background: var(--primary-dark-500);
    border-radius: 50%;
    position: relative;
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: transparent;
      color: var(--light);
      font-weight: 600;
      text-transform: capitalize;
    }
  }
  .review-contents {
    margin-left: 2rem;
  }
  .review-title {
    color: var(--gray-600);
    margin-bottom: 0;
    font-weight: 500;
  }
`;
