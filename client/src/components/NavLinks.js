import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useSelector } from "react-redux"; 

const NavLinks = ({ toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth); 

  return (
    <div className="nav-links">
      {links
        .filter((link) => link.roles.includes(user.role)) 
        .map((link) => {
          const { text, path, id, icon } = link;
          return (
            <NavLink
              to={path}
              className={({ isActive }) => {
                return isActive ? "nav-link active" : "nav-link";
              }}
              key={id}
              onClick={toggleSidebar}
              end
            >
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
          );
        })}
    </div>
  );
};
export default NavLinks;

