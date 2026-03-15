import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCartCount, getWishlistCount } from "../utils/storage";
import { getCurrentUser, logoutUser } from "../utils/auth";

export default function Navbar({ search = "", setSearch = () => {} }) {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const updateData = () => {
    setCartCount(getCartCount());
    setWishlistCount(getWishlistCount());
    setCurrentUser(getCurrentUser());
  };

  useEffect(() => {
    updateData();

    window.addEventListener("storageUpdate", updateData);
    window.addEventListener("storage", updateData);

    return () => {
      window.removeEventListener("storageUpdate", updateData);
      window.removeEventListener("storage", updateData);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <header className="lux-navbar">
      <div className="lux-navbar-container">
        <Link to="/" className="lux-logo">
          VELOURA
        </Link>

        <div className="lux-search">
          <input
            type="text"
            placeholder="Search premium fashion..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <nav className="lux-nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/wishlist">Wishlist ({wishlistCount})</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/profile">Profile</Link>

          {currentUser ? (
            <>
              <span className="nav-user">Hi, {currentUser.name}</span>
              <button className="nav-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}