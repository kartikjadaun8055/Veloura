import { useNavigate } from "react-router-dom";

export default function SellerNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    localStorage.removeItem("sellerId");
    localStorage.removeItem("sellerName");
    navigate("/login");
  };

  return (
    <header className="panel-navbar">
      <div>
        <h1>Seller Dashboard</h1>
        <p>Elegant seller control panel for Veloura management</p>
      </div>

      <div className="panel-navbar-right">
        <button className="role-badge">
          {localStorage.getItem("sellerName") || "Seller"}
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}