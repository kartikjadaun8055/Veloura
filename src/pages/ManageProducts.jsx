import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const apiUrl = "http://localhost:5000";

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    countInStock: "",
    description: "",
    images: [],
  });

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/products`);
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/products/${id}`);
      alert("Product deleted");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const editHandler = (product) => {
    setEditingProduct(product._id);
    setFormData({
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      countInStock: product.countInStock,
      description: product.description,
      images: product.images || [],
    });
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${apiUrl}/api/products/${editingProduct}`, formData);
      alert("Product updated");
      setEditingProduct(null);
      setFormData({
        name: "",
        brand: "",
        category: "",
        price: "",
        countInStock: "",
        description: "",
        images: [],
      });
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Manage Products</h1>

      {editingProduct && (
        <form onSubmit={updateHandler} style={{ marginBottom: "30px" }}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Brand"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock"
            value={formData.countInStock}
            onChange={(e) =>
              setFormData({ ...formData, countInStock: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <button type="submit">Update Product</button>
        </form>
      )}

      <div style={{ display: "grid", gap: "20px" }}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <img
              src={product.images?.[0]}
              alt={product.name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />

            <div style={{ flex: 1 }}>
              <h3>{product.name}</h3>
              <p>₹ {product.price}</p>
              <p>Stock: {product.countInStock}</p>
            </div>

            <button onClick={() => editHandler(product)}>Edit</button>
            <button onClick={() => deleteHandler(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}