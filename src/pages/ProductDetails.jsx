import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  addToCart,
  toggleWishlist,
  isInWishlist,
  getReviews,
  addReview,
} from "../utils/storage";

const allProducts = [
  {
    _id: "1",
    name: "Tailored Robe Jacket",
    category: "Women",
    price: 2499,
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-tailored-robe-coat--FUKG79B8M014_PM1_Cropped%20view.jpg",
      "https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-tailored-robe-coat--FUKG79B8M014_PM2_Front%20view.jpg",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    ],
    description:
      "A premium white dress designed for elegant occasions, modern styling, and all-day comfort.",
  },
  {
    _id: "2",
    name: "Premium Blue Outfit",
    category: "Women",
    price: 1999,
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
    ],
    description:
      "A sophisticated blue outfit with premium finishing, perfect for stylish day and evening looks.",
  },
  {
    _id: "3",
    name: "Classic Men Blazer",
    category: "Men",
    price: 3299,
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&w=1000&q=80",
    ],
    description:
      "Tailored for confidence, this blazer combines luxury fabric with a smart modern silhouette.",
  },
  {
    _id: "4",
    name: "Modern Green Style",
    category: "Women",
    price: 2199,
    sizes: ["S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    ],
    description:
      "Fresh, refined, and easy to style, this modern green outfit elevates your everyday wardrobe.",
  },
];

function StarRating({ value = 0, onChange, interactive = false }) {
  return (
    <div className="pd-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`pd-star ${star <= value ? "active" : ""}`}
          onClick={interactive ? () => onChange(star) : undefined}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const imageWrapRef = useRef(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const [reviewsRefresh, setReviewsRefresh] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  const product = useMemo(() => {
    return allProducts.find((item) => item._id === id);
  }, [id]);

  useEffect(() => {
    if (product?.sizes?.length) {
      setSelectedSize(product.sizes[0]);
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [product]);

  const reviews = useMemo(() => {
    return product ? getReviews(product._id) : [];
  }, [product, reviewsRefresh]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts.filter((item) => item._id !== product._id);
  }, [product]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="product-not-found">
          <h2>Product not found</h2>
          <Link to="/products" className="back-products-btn">
            Back to Products
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const activeImage = product.images[activeImageIndex];
  const wished = isInWishlist(product._id);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleMouseMove = (e) => {
    if (!imageWrapRef.current) return;
    const rect = imageWrapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      image: activeImage,
      selectedSize,
      quantity,
    });
    setCartPulse(true);
    setTimeout(() => setCartPulse(false), 450);
  };

  const handleWishlist = () => {
    toggleWishlist({
      ...product,
      image: product.images[0],
    });
  };

  const handleTouchStart = (e) => {
    setTouchEndX(0);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) nextImage();
    if (distance < -50) prevImage();
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!reviewForm.name.trim() || !reviewForm.comment.trim()) return;

    addReview(product._id, {
      id: Date.now(),
      name: reviewForm.name,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      createdAt: new Date().toLocaleDateString(),
    });

    setReviewForm({ name: "", rating: 5, comment: "" });
    setReviewsRefresh((prev) => !prev);
  };

  return (
    <>
      <Navbar />

      <div className="product-details-page">
        <div className="product-details-grid">
          <div className="pd-vertical-thumbs">
            {product.images.map((img, index) => (
              <button
                key={index}
                type="button"
                className={`pd-thumb-vertical ${
                  activeImageIndex === index ? "active" : ""
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={img} alt={`${product.name}-${index + 1}`} />
              </button>
            ))}
          </div>

          <div className="pd-gallery-main">
            <div
              ref={imageWrapRef}
              className={`pd-main-image-wrap ${zoomed ? "zoomed" : ""}`}
              style={{
                "--zoom-x": `${zoomPos.x}%`,
                "--zoom-y": `${zoomPos.y}%`,
              }}
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <button type="button" className="pd-arrow left" onClick={prevImage}>
                ‹
              </button>

              <img
                src={activeImage}
                alt={product.name}
                className="pd-main-image"
                onClick={() => setFullscreenOpen(true)}
              />

              <button type="button" className="pd-arrow right" onClick={nextImage}>
                ›
              </button>

              <button
                type="button"
                className="pd-fullscreen-btn"
                onClick={() => setFullscreenOpen(true)}
              >
                Fullscreen
              </button>
            </div>
          </div>

          <div className="product-details-content">
            <p className="product-details-category">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="product-details-price">₹{product.price}</p>
            <p className="product-details-description">{product.description}</p>

            <div className="pd-option-block">
              <h4>Select Size</h4>
              <div className="pd-size-row">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`pd-size-btn ${
                      selectedSize === size ? "active" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pd-option-block">
              <h4>Quantity</h4>
              <div className="pd-qty-box">
                <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  -
                </button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity((q) => q + 1)}>
                  +
                </button>
              </div>
            </div>

            <div className="product-details-actions">
              <button
                className={`details-cart-btn ${cartPulse ? "cart-bump" : ""}`}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <button
                className={`details-wishlist-btn ${wished ? "active" : ""}`}
                onClick={handleWishlist}
              >
                {wished ? "♥ Saved" : "♡ Wishlist"}
              </button>
            </div>

            <Link to="/products" className="back-products-btn">
              ← Back to Products
            </Link>
          </div>
        </div>

        <div className="pd-bottom-grid">
          <div className="pd-reviews-card">
            <h2>Customer Reviews</h2>

            <form className="pd-review-form" onSubmit={handleSubmitReview}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={reviewForm.name}
                onChange={(e) =>
                  setReviewForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />

              <textarea
                name="comment"
                rows="4"
                placeholder="Write your review"
                value={reviewForm.comment}
                onChange={(e) =>
                  setReviewForm((prev) => ({ ...prev, comment: e.target.value }))
                }
              />

              <StarRating
                value={reviewForm.rating}
                interactive
                onChange={(value) =>
                  setReviewForm((prev) => ({ ...prev, rating: value }))
                }
              />

              <button type="submit" className="pd-submit-review-btn">
                Submit Review
              </button>
            </form>

            <div className="pd-review-list">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="pd-review-item">
                    <strong>{review.name}</strong>
                    <StarRating value={review.rating} />
                    <p>{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet</p>
              )}
            </div>
          </div>

          <div className="pd-related-card">
            <h2>Related Products</h2>
            <div className="pd-related-scroll">
              {relatedProducts.map((item) => (
                <Link
                  to={`/products/${item._id}`}
                  key={item._id}
                  className="pd-related-item"
                >
                  <img src={item.images[0]} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.category}</p>
                    <span>₹{item.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {fullscreenOpen && (
        <div className="pd-fullscreen-overlay" onClick={() => setFullscreenOpen(false)}>
          <div className="pd-fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="pd-close-fullscreen"
              onClick={() => setFullscreenOpen(false)}
            >
              ×
            </button>

            <button type="button" className="pd-fullscreen-nav left" onClick={prevImage}>
              ‹
            </button>

            <img src={activeImage} alt={product.name} className="pd-fullscreen-image" />

            <button type="button" className="pd-fullscreen-nav right" onClick={nextImage}>
              ›
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}