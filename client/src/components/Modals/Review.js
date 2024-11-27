import Modal from "./modal.styled";
import { closeModal } from "../../features/Modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Review = () => {
  const dispatch = useDispatch();
  const { show, modalData } = useSelector((states) => states.modal);
  const { totalReviews, reviews } = modalData;
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
          <p>
            <span className="review-count">Review Count: </span>{" "}
            {totalReviews ?? 0}
          </p>
          {totalReviews < 1 && <p>No review are present on this product</p>}
          {reviews?.map(({ title, comment, user: { name }, _id }) => (
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
          ))}
        </Wrapper>
      </Modal.Body>
    </Modal>
  );
};

export default Review;

const Wrapper = styled.div`
  .review-count {
    color: var(--dark);
    font-weight: 500;
  }
  .avatar-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    /* margin-bottom: 0.5rem; */
    .avatar-name {
      font-weight: 500;
      font-size: 1.25rem;
      text-transform: capitalize;
      color: var(--gray-700);
    }
  }
  .avatar {
    width: 2rem;
    height: 2rem;
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
    margin-left: 2.5rem;
  }
  .review-title {
    color: var(--gray-600);
    margin-bottom: 0;
    font-weight: 500;
  }
`;
