import NavLinks from "./NavLinks";
import Logo from "../components/Logo";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.auth);

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <NavLink to="/">
              <Logo className="logo" />
            </NavLink>
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background: var(--primary-dark-800);
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: var(--transition);
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: var(--nav-height);
      background: var(--primary-dark-800);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      .logo {
        width: 8rem;
        height: 8rem;
      }
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: var(--light);
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: var(--transition);
    }
    .nav-link:hover {
      background: var(--primary-dark-100);
      padding-left: 3rem;
      color: var(--dark);
    }
    .nav-link:hover .icon {
      color: var(--primary-dark-500);
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
      transition: var(--transition);
    }
    .active {
      color: var(--dark);
      background: var(--primary-dark-100);
      font-weight: 700;
    }
    .active .icon {
      color: var(--primary-dark-700);
    }
  }
`;
