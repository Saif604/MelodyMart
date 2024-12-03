import { Home, Products, Logger, Cart,SingleProduct, Orders,Reviews,Profile,Shared,Error} from "./pages";
import { SharedLayout,Protected,Login,Register, Checkout } from "./components";
import {ReviewModal,OrderModal} from "./components/Modals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Shared />
            </Protected>
          }
        >
          <Route index element={<Profile />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<SingleProduct />} />
          <Route path="products/:id" element={<ReviewModal />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders" element={<OrderModal />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route
          path="/login"
          element={
            <Logger>
              {({ handleSubmit, errors, touched,isLoading}) => (
                <Login
                  handleSubmit={handleSubmit}
                  errors={errors}
                  touched={touched}
                  isLoading={isLoading}
                />
              )}
            </Logger>
          }
        />
        <Route
          path="/register"
          element={
            <Logger>
              {({ handleSubmit, errors, touched,isLoading }) => (
                <Register
                  handleSubmit={handleSubmit}
                  errors={errors}
                  touched={touched}
                  isLoading={isLoading}
                />
              )}
            </Logger>
          }
        />
        <Route path="*" element={<Error/>}/>
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
