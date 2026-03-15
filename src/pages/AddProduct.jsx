import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "Women",
    subCategory: "",
    price: "",
    salePrice: "",
    stock: "",
    description: "",
    fabric: "",
    color: "",
    sizes: "",
    fit: "",
    sleeveType: "",
    neckType: "",
    pattern: "",
    occasion: "",
    washCare: "",
  });

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const videoElement = document.createElement("video");
    videoElement.preload = "metadata";

    videoElement.onloadedmetadata = () => {
      window.URL.revokeObjectURL(videoElement.src);

      if (videoElement.duration > 15) {
        alert("Video must be under 15 seconds only");
        e.target.value = "";
        setVideo(null);
        return;
      }

      setVideo(file);
    };

    videoElement.src = URL.createObjectURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const sellerId = localStorage.getItem("sellerId");

      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("brand", formData.brand);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("subCategory", formData.subCategory);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("salePrice", formData.salePrice);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("fabric", formData.fabric);
      formDataToSend.append("color", formData.color);
      formDataToSend.append("sizes", formData.sizes);
      formDataToSend.append("fit", formData.fit);
      formDataToSend.append("sleeveType", formData.sleeveType);
      formDataToSend.append("neckType", formData.neckType);
      formDataToSend.append("pattern", formData.pattern);
      formDataToSend.append("occasion", formData.occasion);
      formDataToSend.append("washCare", formData.washCare);
      formDataToSend.append("seller", sellerId || "");

      images.forEach((img) => {
        formDataToSend.append("images", img);
      });

      if (video) {
        formDataToSend.append("video", video);
      }

      const res = await axios.post(
        "http://localhost:5000/api/products",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        setMessage("Product added successfully");

        setFormData({
          name: "",
          brand: "",
          category: "Women",
          subCategory: "",
          price: "",
          salePrice: "",
          stock: "",
          description: "",
          fabric: "",
          color: "",
          sizes: "",
          fit: "",
          sleeveType: "",
          neckType: "",
          pattern: "",
          occasion: "",
          washCare: "",
        });

        setImages([]);
        setVideo(null);
      }
    } catch (error) {
      console.error("Product create error:", error.response?.data || error.message);
      setMessage("Server error while creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "10px" }}>Add Clothing Product</h1>
      <p style={{ marginBottom: "20px", color: "#8b5e3c" }}>
        Create and publish products to your store and main website.
      </p>

      {message && (
        <div
          style={{
            background: message.includes("successfully") ? "#e7f8ec" : "#fde8e8",
            color: message.includes("successfully") ? "#166534" : "#b91c1c",
            padding: "12px 14px",
            borderRadius: "10px",
            marginBottom: "18px",
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div>
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand"
              style={inputStyle}
            />
          </div>

          <div>
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          <div>
            <label>Sub Category</label>
            <input
              type="text"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              placeholder="Sub Category"
              style={inputStyle}
            />
          </div>

          <div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label>Sale Price</label>
            <input
              type="number"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
              placeholder="Sale Price"
              style={inputStyle}
            />
          </div>

          <div>
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label>Fabric</label>
            <input
              type="text"
              name="fabric"
              value={formData.fabric}
              onChange={handleChange}
              placeholder="Fabric"
              style={inputStyle}
            />
          </div>

          <div>
            <label>Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Color"
              style={inputStyle}
            />
          </div>

          <div>
            <label>Sizes</label>
            <input
              type="text"
              name="sizes"
              value={formData.sizes}
              onChange={handleChange}
              placeholder="S, M, L, XL"
              style={inputStyle}
            />
          </div>

          <div>
            <label>Fit</label>
            <input
              type="text"
              name="fit"
              value={formData.fit}
              onChange={handleChange}
              placeholder="Fit"
              style={inputStyle}
            />
          </div>

          <div>
            <label>Sleeve Type</label>
            <input
              type="text"
              name="sleeveType"
              value={formData.sleeveType}
              onChange={handleChange}
              placeholder="Sleeve Type"
              style={inputStyle}
            />
          </div>

          <div>
            <label>Neck Type</label>
            <input
              type="text"
              name="neckType"
              value={formData.neckType}
              onChange={handleChange}
              placeholder="Neck Type"
              style={inputStyle}
            />
          </div>

          <div>
            <label>Pattern</label>
            <input
              type="text"
              name="pattern"
              value={formData.pattern}
              onChange={handleChange}
              placeholder="Pattern"
              style={inputStyle}
            />
          </div>

          <div>
            <label>Occasion</label>
            <input
              type="text"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              placeholder="Occasion"
              style={inputStyle}
            />
          </div>

          <div>
            <label>Wash Care</label>
            <input
              type="text"
              name="washCare"
              value={formData.washCare}
              onChange={handleChange}
              placeholder="Wash Care"
              style={inputStyle}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows="5"
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          <div>
            <label>Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              style={fileStyle}
            />
          </div>

          <div>
            <label>Upload Product Video (only 1, max 15 sec)</label>
            <input
              type="file"
              accept="video/mp4,video/webm,video/ogg"
              onChange={handleVideoChange}
              style={fileStyle}
            />
            {video && (
              <p style={{ marginTop: "8px", color: "green" }}>
                Selected video: {video.name}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "20px",
            background: "#8b5e3c",
            color: "#fff",
            border: "none",
            padding: "12px 18px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginTop: "8px",
  borderRadius: "10px",
  border: "1px solid #d6c1b2",
  outline: "none",
  boxSizing: "border-box",
};

const fileStyle = {
  width: "100%",
  marginTop: "8px",
};