import styled from "styled-components";
const WrapperCard = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
export default WrapperCard;

const Wrapper = styled.div`
  border: 1px solid #e0e0e0;
  background: #fff;
  box-shadow: var(--dark-shadow);
  border-radius: 0.25rem;
  padding: 1rem;
`;
