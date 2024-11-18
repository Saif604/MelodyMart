import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import styled from "styled-components";
import { BiLogInCircle, BiCart} from "react-icons/bi";
import { NavLink } from "react-router-dom";
// import Wrapper from "../assets/wrappers/NavBar.js";
import { useState } from "react";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const showCanvas = () => setShow(true);
  const hideCanvas = () => setShow(false);

  return (
    <Wrapper expand={"md"} sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Fizmar
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar-expand-md"
          onClick={showCanvas}
        />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-md"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end"
          show={show}
          onHide={hideCanvas}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
              Fizmar
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              <Nav.Link as={NavLink} to="/" onClick={hideCanvas}>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/products" onClick={hideCanvas}>
                Products
              </Nav.Link>
            </Nav>
            <Nav className="cstm-navbar-nav">
              <Nav.Link
                as={NavLink}
                to="/cart"
                className="cart"
                onClick={hideCanvas}
              >
                <BiCart className="icon" />
                <span className="cart-count">1</span>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/login" onClick={hideCanvas}>
                Login <BiLogInCircle className="icon" />
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Wrapper>
  );
};
export default NavBar;

const Wrapper = styled(Navbar)`
  background: var(--primary-dark-800);
  height: var(--nav-height);

  .navbar-brand{
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
  }
`;
