import { Routes, Route, Navigate } from "react-router-dom";
import SellerNavbar from "./components/SellerNavbar";
import SellerSidebar from "./components/SellerSidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import SellerDashboard from "./pages/SellerDashboard";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import OrdersReceived from "./pages/OrdersReceived";
import SellerLogin from "./pages/SellerLogin";
import "./App.css";
import EditProduct from "./pages/EditProduct";

function SellerLayout({ children }) {
  return (
    <div className="panel-layout">
      <SellerSidebar />
      <div className="panel-main">
        <SellerNavbar />
        <div className="panel-content">{children}</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<SellerLogin />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <SellerLayout>
              <SellerDashboard />
            </SellerLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-product"
        element={
          <ProtectedRoute>
            <SellerLayout>
              <AddProduct />
            </SellerLayout>
          </ProtectedRoute>
        }
      />

      <Route
  path="/edit-product/:id"
  element={
    <ProtectedRoute>
      <SellerLayout>
        <EditProduct />
      </SellerLayout>
    </ProtectedRoute>
  }
/>

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <SellerLayout>
              <Products />
            </SellerLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <SellerLayout>
              <OrdersReceived />
            </SellerLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}