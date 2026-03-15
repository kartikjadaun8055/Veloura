import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/products" element={<Products />} />

      {/* Product Details */}
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* Cart */}
      <Route path="/cart" element={<Cart />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Checkout */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />

      {/* User */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} />

      {/* 404 */}
      <Route path="*" element={<h1 style={{padding:"40px"}}>Page Not Found</h1>} />

    </Routes>
  );
}