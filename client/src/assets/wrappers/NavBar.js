import styled from "styled-components";
import { Navbar } from "react-bootstrap";
const Wrapper = styled(Navbar)`
  background: var(--primary-dark-800);
  height: var(--nav-height);

  .navbar-brand {
    color: var(--light);
    font-weight: 500;
    letter-spacing: var(--spacing);
  }

  .nav-link {
    color: var(--light);
    font-weight: 500;
    letter-spacing: 1px;
  }
  .nav-link.active {
    color: var(--primary-dark-100);
  }
  .offcanvas-body {
    justify-content: space-between;
  }
  .icon {
    font-size: 1.5rem;
  }

  .navbar-toggler {
    background: var(--light);
  }
  span {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 0.25rem;
  }
`;
export default Wrapper;