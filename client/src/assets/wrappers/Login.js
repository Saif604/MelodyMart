import styled from "styled-components";

const Wrapper = styled.main`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--clr-white);

  .form-container {
    width: 95vw;
    max-width: var(--fixed-width);
    padding: 2rem;
    background: var(--clr-white);
    border-radius: 0.25rem;
    border: 1px solid var(--clr-border);
    border-top: 5px solid var(--clr-dark);
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