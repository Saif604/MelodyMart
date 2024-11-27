import styled from "styled-components";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../features/Authenticate/authSlice";
import AuthBtn from "./AuthBtn";

const NavDash = () => {
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <AuthBtn />
      </div>
    </Wrapper>
  );
};
export default NavDash;

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  background: var(--primary-dark-800);
  .logo {
    display: flex;
    align-items: center;
    width: 4rem;
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-light-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .logo-text {
    display: none;
    margin: 0;
    color: var(--light);
    text-transform: capitalize;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;
