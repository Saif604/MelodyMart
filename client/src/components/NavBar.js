import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import BrandImage from "../assets/images/logo.svg"
import { NavLink } from "react-router-dom";
import Wrapper from "../assets/wrappers/NavBar.js";
import { useState } from "react";
import {  useSelector } from "react-redux";
import AuthBtn from "./AuthBtn.js";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const showCanvas = () => setShow(true);
  const hideCanvas = () => setShow(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <Wrapper expand={"md"} sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src={BrandImage} alt="brand" className="image-fit" />
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
              MelodyMart
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
            <Nav>
              <AuthBtn hideCanvas={hideCanvas} />
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Wrapper>
  );
};
export default NavBar;
