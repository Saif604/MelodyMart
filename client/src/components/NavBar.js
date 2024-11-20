import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import { BiLogInCircle, BiCart, BiLogOutCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Wrapper from "../assets/wrappers/NavBar.js";
import { useState } from "react";
import { logoutUser } from "../features/Authenticate/authSlice";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const showCanvas = () => setShow(true);
  const hideCanvas = () => setShow(false);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () =>{
    dispatch(logoutUser())
  }

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
              {user && (
                <Nav.Link as={NavLink} to="/dashboard" onClick={hideCanvas}>
                  Dashboard
                </Nav.Link>
              )}
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
              {
                !user ? (<Nav.Link as={NavLink} to="/login" onClick={hideCanvas}>
                Login <BiLogInCircle className="icon" />
              </Nav.Link>):(<span onClick={handleLogout}>Logout <BiLogOutCircle className="icon"/></span>)
              }
              
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Wrapper>
  );
};
export default NavBar;