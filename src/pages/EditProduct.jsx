import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sellerId = localStorage.getItem("sellerId");

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setMessage("");

      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      if (data.success && data.product) {
        const product = data.product;

        if (
          product.seller &&
          product.seller.toString &&
          sellerId &&
          product.seller.toString() !== sellerId
        ) {
          setMessage("You are not allowed to edit this product.");
          return;
        }

        setFormData({
          name: product.name || "",
          brand: product.brand || "",
          category: product.category || "",
          price: product.price || "",
          stock: product.stock || "",
          image: product.image || "",
          description: product.description || "",
        });
      } else {
        setMessage(data.message || "Product not found.");
      }
    } catch (error) {
      console.error("Fetch product error:", error);
      setMessage(
        error.response?.data?.message || "Failed to fetch product details."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!sellerId) {
      setMessage("Seller not logged in.");
      return;
    }

    try {
      setUpdating(true);
      setMessage("");

      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        seller: sellerId,
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        payload
      );

      if (data.success) {
        setMessage("Product updated successfully.");

        setTimeout(() => {
          navigate("/products");
        }, 1000);
      } else {
        setMessage(data.message || "Failed to update product.");
      }
    } catch (error) {
      console.error("Update product error:", error);
      setMessage(
        error.response?.data?.message ||
          "Something went wrong while updating product."
      );
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setMessage("Invalid product id.");
      return;
    }

    fetchProduct();
  }, [id]);

  return (
    <div className="page-shell">
      <div className="page-top page-top-flex">
        <div>
          <h2>Edit Product</h2>
          <p>Update your product details, pricing, stock, and image.</p>
        </div>

        <button
          className="mini-btn edit-btn"
          onClick={() => navigate("/products")}
        >
          Back
        </button>
      </div>

      <div className="form-card">
        {message && (
          <div
            style={{
              marginBottom: "18px",
              padding: "14px 16px",
              borderRadius: "14px",
              background:
                message.toLowerCase().includes("success") ||
                message.toLowerCase().includes("updated")
                  ? "#dff5e5"
                  : "#ffe4e4",
              color:
                message.toLowerCase().includes("success") ||
                message.toLowerCase().includes("updated")
                  ? "#14803c"
                  : "#c72d21",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            {message}
          </div>
        )}

        {loading ? (
          <p>Loading product...</p>
        ) : (
          <form onSubmit={handleUpdate}>
            <div className="form-grid">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Brand</label>
                <input
                  type="text"
                  name="brand"
                  placeholder="Enter brand name"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  placeholder="Enter category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter product price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  placeholder="Enter stock quantity"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  name="image"
                  placeholder="Paste image URL"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {formData.image && (
              <div
                style={{
                  marginBottom: "20px",
                  border: "1px solid var(--border)",
                  borderRadius: "18px",
                  padding: "14px",
                  background: "#fff",
                  maxWidth: "280px",
                }}
              >
                <p
                  style={{
                    marginBottom: "10px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "var(--text-dark)",
                  }}
                >
                  Image Preview
                </p>

                <img
                  src={
                    formData.image ||
                    "https://dummyimage.com/300x220/e6dfd6/8b5e3c&text=No+Image"
                  }
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                    borderRadius: "14px",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://dummyimage.com/300x220/e6dfd6/8b5e3c&text=No+Image";
                  }}
                />
              </div>
            )}

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="5"
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                type="submit"
                className="primary-action-btn"
                disabled={updating}
                style={{
                  opacity: updating ? 0.7 : 1,
                  cursor: updating ? "not-allowed" : "pointer",
                }}
              >
                {updating ? "Updating Product..." : "Update Product"}
              </button>

              <button
                type="button"
                className="mini-btn delete-btn"
                onClick={() => navigate("/products")}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}