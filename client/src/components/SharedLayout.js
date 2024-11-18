import {Footer,NavBar} from "./index.js"
import { Outlet } from "react-router-dom";
const SharedLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer/>
    </div>
  );
}
export default SharedLayout