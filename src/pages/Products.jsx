import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const sellerId = localStorage.getItem("sellerId");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/api/products/seller/${sellerId}`
      );

      if (data.success) {
        setProducts(data.products || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Fetch products error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      if (data.success) {
        fetchProducts();
      } else {
        alert(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Delete product error:", error);
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  useEffect(() => {
    if (!sellerId) {
      setLoading(false);
      return;
    }

    fetchProducts();
  }, [sellerId]);

  const getStockClass = (stock) => {
    if (stock === 0) return "status-pill out-of-stock";
    if (stock <= 5) return "status-pill low-stock";
    return "status-pill in-stock";
  };

  const getStockText = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= 5) return "Low Stock";
    return "In Stock";
  };

  return (
    <div className="page-shell">
      <div className="page-top page-top-flex">
        <div>
          <h2>My Products</h2>
          <p>Manage your listed products, stock, and catalog items.</p>
        </div>

        <button
          className="primary-action-btn"
          onClick={() => navigate("/add-product")}
        >
          + Add Product
        </button>
      </div>

      {!sellerId ? (
        <div className="table-wrapper">
          <p style={{ color: "red" }}>Seller not logged in.</p>
        </div>
      ) : loading ? (
        <div className="table-wrapper">
          <p>Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="table-wrapper">
          <p style={{ color: "#8c6b52" }}>No products found.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="panel-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="product-cell">
                     <img
                       src={
                          product.images?.[0]
                               ? `http://localhost:5000${product.images[0]}`
                                : "https://dummyimage.com/80x80/e6dfd6/8b5e3c&text=No+Image"
                         }
                          alt={product.name}
                             className="product-thumb"
                            onError={(e) => {
                             e.target.src =
                              "https://dummyimage.com/80x80/e6dfd6/8b5e3c&text=No+Image";
                               }}
                           />

                      <div className="product-meta">
                        <p className="product-name">{product.name}</p>
                        <p className="product-subtext">
                          {product.description
                            ? product.description.slice(0, 45) + "..."
                            : "No description"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>{product.brand || "N/A"}</td>
                  <td>{product.category || "N/A"}</td>
                  <td>₹{product.price}</td>
                  <td>{product.stock}</td>

                  <td>
                    <span className={getStockClass(product.stock)}>
                      {getStockText(product.stock)}
                    </span>
                  </td>

                  <td>
                    <button
                      className="mini-btn edit-btn"
                      onClick={() => navigate(`/edit-product/${product._id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="mini-btn delete-btn"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}