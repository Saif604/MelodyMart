import styled from "styled-components";

const Wrapper = styled.main`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, var(--primary-light-300), var(--primary-dark-900));

  .form-container {
    width: 85vw;
    max-width: var(--fixed-width);
    padding: 2rem;
    background: var(--light);
    border-radius: 0.25rem;
    border: 1px solid var(--gray-200);
    border-top: 5px solid var(--primary-dark-800);
    box-shadow: var(--dark-shadow);
  }
  .status {
    display: inline-block;
    color: blue;
    margin-left: 4px;
    cursor: pointer;
  }
`;

export default Wrapper;