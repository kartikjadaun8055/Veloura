import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
const slides = [
  {
    image: "https://rain-mag.com/uploads/optimized/20241205-lv-ss25-campaign-master-layout-med-1742417633790-ev8sccvxzf-optimized.jpg",
    subtitle: "Luxury Redefined",
    title: "Premium Fashion For Everyday Confidence",
    text: "Discover elegant outfits designed for modern lifestyles, timeless comfort, and standout presence.",
    button1: "Shop Women",
    button1Link: "/products",
    button2: "Explore Now",
    button2Link: "/register",
  },
  {
    image: "https://fivmagazine.com/wp-content/uploads/2018/08/Gucci-mode-luxus-high-fashion-taschen-schuhe-marke-rot-gr%C3%BCn.jpg",
    subtitle: "Modern Essentials",
    title: "Curated Looks For Men & Women",
    text: "From statement pieces to minimalist fits, Veloura brings premium collections that feel as good as they look.",
    button1: "Shop Men",
    button1Link: "/products",
    button2: "Join Veloura",
    button2Link: "/register",
  },
  {
    image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fashion-youtube-channel-cover-design-template-47492fef6b2dd04b8b979c86835c74df_screen.jpg?ts=1647925136",
    subtitle: "New Season Edit",
    title: "Fresh Arrivals With Timeless Style",
    text: "Elevate your wardrobe with refined silhouettes, luxury textures, and versatile looks for every day.",
    button1: "New Arrivals",
    button1Link: "/products",
    button2: "Create Account",
    button2Link: "/register",
  },
  {
    image: "https://fabriclore.com/cdn/shop/articles/Blog_Banner_2880x1410_20.jpg?v=1666331392&width=1500",
    subtitle: "Signature Collection",
    title: "Designed To Make Every Look Feel Special",
    text: "Explore premium pieces that blend comfort, confidence, and modern elegance in every detail.",
    button1: "Shop Collection",
    button1Link: "/products",
    button2: "Get Started",
    button2Link: "/register",
  },
  {
    image: "https://img-cdn.publive.online/fit-in/1200x675/filters:format(webp)/elle-india/media/media_files/2025/11/04/banner-publive-1-2025-11-04-15-17-08.png",
    subtitle: "Signature Collection",
    title: "Designed To Make Every Look Feel Special",
    text: "Explore premium pieces that blend comfort, confidence, and modern elegance in every detail.",
    button1: "Shop Collection",
    button1Link: "/products",
    button2: "Get Started",
    button2Link: "/register",
  },
];

const categories = [
  {
    title: "Women Collection",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "New Arrivals",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Men Collection",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "Tailored Robe Jacket",
    price: 400099,
    image:
      "https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-tailored-robe-coat--FUKG79B8M014_PM1_Cropped%20view.jpg",
  },
  {
    id: 2,
    name: "Premium Blue Outfit",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Modern Green Style",
    price: 2199,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Soft Beige Fashion",
    price: 2699,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Classic Black Edition",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Minimal Luxury Fit",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [search, setSearch] = useState("");

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const filteredProducts = useMemo(() => {
    return featuredProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />

      <section className="hero-slider-section">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            >
              <img src={slide.image} alt={slide.title} className="hero-slide-image" />

              <div className="hero-overlay">
                <p className="hero-subtitle">{slide.subtitle}</p>
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-description">{slide.text}</p>

                <div className="hero-actions">
                  <Link to={slide.button1Link} className="hero-btn-primary">
                    {slide.button1}
                  </Link>
                  <Link to={slide.button2Link} className="hero-btn-secondary">
                    {slide.button2}
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <button className="hero-arrow left" onClick={prevSlide}>
            ‹
          </button>
          <button className="hero-arrow right" onClick={nextSlide}>
            ›
          </button>

          <div className="hero-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`hero-dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <p className="section-kicker">Luxury Categories</p>
          <h2 className="section-title-main">Shop By Collection</h2>
        </div>

        <div className="category-grid">
          {categories.map((item, index) => (
            <div key={index} className="category-card">
              <img src={item.image} alt={item.title} />
              <div className="category-content">
                <h3>{item.title}</h3>
                <Link to="/products">Explore</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <p className="section-kicker">Featured Edit</p>
          <h2 className="section-title-main">Trending Products</h2>
        </div>

        <div className="featured-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="featured-card">
                <div className="featured-image-wrap">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="featured-card-body">
                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>
                  <Link to="/products" className="featured-btn">
                    View Product
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-result">No products found for "{search}"</p>
          )}
        </div>
      </section>

      <section className="promo-luxury">
        <div className="promo-box">
          <p className="section-kicker">Veloura Promise</p>
          <h2>Crafted For Confidence, Styled For Everyday Luxury</h2>
          <p>
            Discover premium outfits, clean silhouettes, and versatile fashion
            designed for comfort, elegance, and modern living.
          </p>
          <Link to="/products" className="hero-btn-primary">
            Explore Collection
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}