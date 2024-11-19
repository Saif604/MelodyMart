import styled from "styled-components";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const Stars = ({ ratings,reviews }) => {
  const newStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return ratings >= index + 1 ? (
      <BsStarFill />
    ) : ratings >= number ? (
      <BsStarHalf />
    ) : (
      <BsStar />
    );
  });
  return (
    <Wrapper>
      <div className="stars">
        {newStars.map((star, index) => (
          <span key={index}>{star}</span>
        ))}
      </div>
      <p className="reviews">
        ({reviews} customer reviews)
      </p>
    </Wrapper>
  );
};
export default Stars;

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  span{
    font-size: 1rem;
    margin-right:0.25rem;
    color: var(--primary-light-500);
  }
  p{
    margin: 0;
  }
`;
