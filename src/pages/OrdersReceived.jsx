import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersReceived() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const sellerId = localStorage.getItem("sellerId");

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/api/orders/seller/${sellerId}`
      );

      if (data.success) {
        setOrders(data.orders || []);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
      alert("Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        { status }
      );

      if (data.success) {
        fetchOrders();
      } else {
        alert(data.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Update status error:", error);
      alert("Failed to update order status");
    }
  };

  useEffect(() => {
    if (!sellerId) {
      setLoading(false);
      return;
    }

    fetchOrders();
  }, [sellerId]);

  return (
    <div className="page-shell">
      <div className="page-top">
        <h2>Orders</h2>
        <p>Track purchases, manage updates, and control seller fulfillment flow.</p>
      </div>

      {!sellerId ? (
        <div className="table-wrapper">
          <p style={{ color: "red" }}>Seller not logged in.</p>
        </div>
      ) : loading ? (
        <div className="table-wrapper">
          <p>Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="table-wrapper">
          <p style={{ color: "#8c6b52" }}>No orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-top">
                <div className="order-info">
                  <p>
                    <strong>Customer:</strong>{" "}
                    {order.customerName || order.shippingAddress?.name || "N/A"}
                  </p>

                  <p>
                    <strong>Email:</strong> {order.customerEmail || "N/A"}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {order.customerPhone || order.shippingAddress?.phone || "N/A"}
                  </p>

                  <p>
                    <strong>Address:</strong>{" "}
                    {order.shippingAddress
                      ? `${order.shippingAddress.address || ""}, ${
                          order.shippingAddress.city || ""
                        }, ${order.shippingAddress.pincode || ""}`
                      : "N/A"}
                  </p>
                </div>

                <div className="order-summary">
                  <p>
                    <strong>Order ID:</strong> {order._id}
                  </p>

                  <p>
                    <strong>Total:</strong> ₹{order.totalAmount}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`status-pill ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </p>

                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="order-items-section">
                <h3>Items</h3>

                <div className="order-items">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <img
                        src={item.image || "https://via.placeholder.com/80"}
                        alt={item.name}
                        className="order-item-image"
                      />

                      <div className="order-item-details">
                        <p className="item-name">{item.name}</p>
                        <p className="item-meta">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>

                      <p className="item-total">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}