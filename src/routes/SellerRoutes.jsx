import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersReceived from "./pages/seller/OrdersReceived";
import EditProduct from "./pages/seller/EditProduct";
import SellerProducts from "./pages/seller/SellerProducts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/seller/orders" element={<OrdersReceived />} />
        <Route path="/seller/products" element={<SellerProducts />} />
        <Route path="/seller/product/:id/edit" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;