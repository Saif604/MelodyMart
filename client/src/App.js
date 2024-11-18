import { Home, Products, Login, Cart,SingleProduct } from "./pages";
import {Profile, Shared} from "./pages/Dashboard";
import { SharedLayout,Protected } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<SingleProduct />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="/dashboard" element={<Protected><Shared/></Protected>}>
          <Route index element={<Profile/>}/>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
