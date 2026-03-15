import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../utils/auth";
import { saveProfile } from "../utils/storage";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const user = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    registerUser(user);

    saveProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: "",
      city: "",
      pincode: "",
    });

    setSuccess("Account created successfully!");

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
            <p className="auth-kicker">Join Veloura</p>
            <h1>Create Your Account</h1>
            <p>
              Start your premium fashion journey and explore elegant collections
              crafted for modern style.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Register</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {error && <p className="auth-error">{error}</p>}
            {success && <p className="auth-success">{success}</p>}

            <button type="submit" className="auth-btn">
              Create Account
            </button>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}