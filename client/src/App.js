import { Home, Products, Logger, Cart,SingleProduct, Orders,Reviews,Profile,Shared,Error,AllUsers,AllProducts,AllOrders, AddProduct} from "./pages";
import { SharedLayout,Protected,Login,Register, Checkout, RoleProtected,GuardCheckout } from "./components";
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
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reviews" element={<Reviews />} />

          {/* Admin-specific routes */}
          <Route
            path="allUsers"
            element={
              <RoleProtected allowedRoles={["admin"]}>
                <AllUsers />
              </RoleProtected>
            }
          />
          <Route
            path="allOrders"
            element={
              <RoleProtected allowedRoles={["admin"]}>
                <AllOrders />
              </RoleProtected>
            }
          />
          <Route
            path="allProducts"
            element={
              <RoleProtected allowedRoles={["admin"]}>
                <AllProducts />
              </RoleProtected>
            }
          />
          <Route
            path="addProduct"
            element={
              <RoleProtected allowedRoles={["admin"]}>
                <AddProduct/>
              </RoleProtected>
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <Logger>
              {({ handleSubmit, errors, touched, isLoading }) => (
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
              {({ handleSubmit, errors, touched, isLoading }) => (
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
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
