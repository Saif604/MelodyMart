import styled from "styled-components";
import { Navbar } from "react-bootstrap";

const Wrapper = styled(Navbar)`
  background: var(--clr-primary-5);
  height: var(--nav-height);

  .nav-link {
    color: var(--clr-white);
    font-weight: 500;
    letter-spacing: 1px;
  }
  .nav-link.active {
    color: var(--clr-primary-10);
  }
  .offcanvas-body {
    justify-content: space-between;
  }
  .icon {
    font-size: 1.5rem;
  }

  .navbar-toggler{
    background: var(--clr-white);
  }
  span{
    color: #fff;
    display:flex;
    align-items:center;
    justify-content: center;
    cursor:pointer;
  }
`;
export default Wrapper;