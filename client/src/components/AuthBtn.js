import styled from "styled-components";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../features/Authenticate/authSlice";
import { NavLink } from "react-router-dom";

const AuthBtn = ({ hideCanvas }) => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    if (hideCanvas) {
      hideCanvas();
    }
  };
  if (!user) {
    return (
      <Wrapper>
        <NavLink to="/login">
          <button type="button" className="btn login-btn">
            Login
          </button>
        </NavLink>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <button
        type="button"
        className="btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        <FaUserCircle />
        {user?.name}
        <FaCaretDown />
      </button>
      <div
        className={showLogout ? "dropdown show-dropdown" : "dropdown"}
        onClick={handleLogout}
      >
        <button type="button" className="dropdown-btn">
          logout
        </button>
      </div>
    </Wrapper>
  );
};
export default AuthBtn;

const Wrapper = styled.div`
  position: relative;
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    color: var(--light);
    text-transform: capitalize;
    letter-spacing: 1px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8);
  }
  .login-btn {
    background: var(--primary-dark-600);
  }
  .login-btn:hover {
    background: var(--primary-dark-500);
  }
  .dropdown {
    position: absolute;
    top: 2.5rem;
    left: 0;
    width: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.9);
    border: 1px solid var(--gray-900);
    border-top: 1px solid var(--light);
    padding: 0.5rem;
    margin-top: 4px;
    visibility: hidden;
    background: var(--primary-dark-700);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border: none;
    color: var(--light);
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 992px) {
    .btn,
    .dropdown {
      background: var(--dark);
    }
  }
`;
