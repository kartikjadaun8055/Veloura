import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="lux-footer">
      <div className="lux-footer-top">
        <div className="lux-footer-brand">
          <h2>VELOURA</h2>
          <p>
            Timeless luxury fashion crafted for modern elegance and confident
            everyday style.
          </p>
        </div>

        <div className="lux-footer-links">
          <h4>Shop</h4>
          <Link to="/products">All Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </div>

        <div className="lux-footer-links">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Collections</a>
          <a href="#">Lookbook</a>
          <a href="#">Contact</a>
        </div>

        <div className="lux-footer-links">
          <h4>Newsletter</h4>
          <p>Get updates on premium drops and exclusive arrivals.</p>
          <div className="lux-footer-newsletter">
            <input type="email" placeholder="Enter your email" />
            <button>Join</button>
          </div>
        </div>
      </div>

      <div className="lux-footer-bottom">
        <p>© 2026 Veloura. All rights reserved.</p>
      </div>
    </footer>
  );
}