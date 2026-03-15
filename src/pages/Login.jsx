import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = loginUser(formData.email, formData.password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess("Login successful!");
    setTimeout(() => {
      navigate("/profile");
    }, 800);
  };

  return (
    <>
      <Navbar />

      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-left">
            <p className="auth-kicker">Welcome Back</p>
            <h1>Login To Veloura</h1>
            <p>
              Sign in to continue your premium shopping experience, manage
              orders, and save your favorite products.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Login</h2>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {error && <p className="auth-error">{error}</p>}
            {success && <p className="auth-success">{success}</p>}

            <button type="submit" className="auth-btn">
              Login
            </button>

            <p className="auth-switch">
              Don&apos;t have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}