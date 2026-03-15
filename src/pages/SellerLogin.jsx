import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SellerLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/sellers/login",
        formData
      );

      if (data.success) {
        localStorage.setItem("sellerToken", data.token || "");
        localStorage.setItem("sellerId", data.seller?._id || "");
        localStorage.setItem("sellerName", data.seller?.name || "");

        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Seller login error:", error);
      alert(
        error.response?.data?.message || "Something went wrong while login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-left">
          <p className="login-tag">VELOURA SELLER</p>
          <h1>Welcome Back</h1>
          <p className="login-text">
            Access your premium seller dashboard to manage products, orders, and
            store growth with ease.
          </p>

          <div className="login-feature-list">
            <div className="login-feature-item">Manage products easily</div>
            <div className="login-feature-item">Track customer orders</div>
            <div className="login-feature-item">Update order status</div>
            <div className="login-feature-item">Grow your store professionally</div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-card">
            <h2>Seller Login</h2>
            <p>Enter your seller account details</p>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="primary-action-btn login-btn">
                {loading ? "Logging in..." : "Login to Dashboard"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}