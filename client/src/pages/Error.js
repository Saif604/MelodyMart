import styled from "styled-components";
import ErrorSvg from "../assets/images/Error.svg";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <Wrapper>
      <div className="section">
        <img src={ErrorSvg} alt="error-page" className="image-fit" />
        <Link to="/" className="button">
          Home
        </Link>
      </div>
    </Wrapper>
  );
};
export default Error;

const Wrapper = styled.main`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-dark-100);
  .section{
    text-align: center;
  }
`;
