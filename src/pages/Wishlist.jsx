import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getWishlist, toggleWishlist, addToCart } from "../utils/storage";
import { useEffect, useState } from "react";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  const loadWishlist = () => {
    setWishlistItems(getWishlist());
  };

  useEffect(() => {
    loadWishlist();

    window.addEventListener("storageUpdate", loadWishlist);
    window.addEventListener("storage", loadWishlist);

    return () => {
      window.removeEventListener("storageUpdate", loadWishlist);
      window.removeEventListener("storage", loadWishlist);
    };
  }, []);

  const handleRemove = (product) => {
    toggleWishlist(product);
    loadWishlist();
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert("Added to cart");
  };

  return (
    <>
      <Navbar />

      <section className="wishlist-page">
        <div className="wishlist-header">
          <p className="wishlist-kicker">Saved For Later</p>
          <h1>My Wishlist</h1>
          <p>
            Keep track of your favorite premium pieces and add them to cart when
            you're ready.
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="wishlist-empty">
            <h2>Your wishlist is empty</h2>
            <p>Add your favorite products and they will appear here.</p>
            <Link to="/products" className="wishlist-shop-btn">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((product) => (
              <div key={product._id} className="wishlist-card">
                <div className="wishlist-image-wrap">
                  <img src={product.image} alt={product.name} />
                  <button
                    className="wishlist-remove-btn"
                    onClick={() => handleRemove(product)}
                  >
                    ♥
                  </button>
                </div>

                <div className="wishlist-card-body">
                  <p className="wishlist-category">{product.category}</p>
                  <h3>{product.name}</h3>
                  <p className="wishlist-price">₹{product.price}</p>

                  <div className="wishlist-actions">
                    <button
                      className="wishlist-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>

                    <Link
                      to={`/products/${product._id}`}
                      className="wishlist-details-btn"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}