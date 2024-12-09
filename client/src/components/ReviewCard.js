import styled from "styled-components";

const ReviewCard = ({ review, sno, onEdit, onDelete }) => {
  const {
    _id: reviewId,
    createdAt,
    rating,
    title,
    comment,
    product: { images },
  } = review;

  return (
    <Wrapper>
      <div className="card-header">
        <h5 className="mb-0">Review No: {sno}</h5>
        <span>{createdAt.split("T")[0]}</span>
      </div>
      <hr />
      <div className="review-details">
        <div className="image-container mb-1">
          <img src={images[0].url} alt="prod-img" className="image-fit" />
        </div>
        <h5>
          Review Id: <span className="ms-2 text-muted">{reviewId}</span>
        </h5>
        <h5>
          Rating: <span className="ms-2 text-muted">{rating}</span>
        </h5>
        <h6 className="text-capitalize">{title}</h6>
        <p className="text-capitalize">{comment}</p>
        <div className="btns-container">
          <button className="btn btn-dark" onClick={() => onEdit(review)}>
            Edit
          </button>
          <button className="btn btn-dark" onClick={() => onDelete(reviewId)}>
            Delete
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
export default ReviewCard;

const Wrapper = styled.div`
  border: 1px solid var(--gray-400);
  box-shadow: var(--dark-shadow);
  padding: 1rem;
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .review-details {
    .image-container {
      height: 13rem;
    }
  }
  .btns-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;
