import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getOrders } from "../utils/storage";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  return (
    <>
      <Navbar />

      <section className="orders-page">
        <div className="orders-header">
          <p className="orders-kicker">Your Shopping Journey</p>
          <h1>My Orders</h1>
          <p>
            Track your placed orders, review purchased products, and keep your
            premium fashion history in one place.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="orders-empty">
            <h2>No orders yet</h2>
            <p>
              You have not placed any orders yet. Start exploring premium
              products and place your first order.
            </p>
            <Link to="/products" className="orders-shop-btn">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card-top">
                  <div>
                    <p className="order-label">Order ID</p>
                    <h3>{order.id}</h3>
                  </div>

                  <div>
                    <p className="order-label">Status</p>
                    <span className={`order-status status-${order.status?.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>

                  <div>
                    <p className="order-label">Placed On</p>
                    <h4>{order.createdAt}</h4>
                  </div>

                  <div>
                    <p className="order-label">Total</p>
                    <h4>₹{order.total}</h4>
                  </div>
                </div>

                <div className="order-shipping-box">
                  <h4>Shipping Details</h4>
                  <p><strong>Name:</strong> {order.customer?.name || order.shippingInfo?.name || "N/A"}</p>
                  <p><strong>Email:</strong> {order.customer?.email || order.shippingInfo?.email || "N/A"}</p>
                  <p><strong>Phone:</strong> {order.customer?.phone || order.shippingInfo?.phone || "N/A"}</p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {order.shippingAddress
                      ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.pincode}`
                      : order.shippingInfo
                      ? `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.pincode}`
                      : "N/A"}
                  </p>
                </div>

                <div className="order-items-list">
                  {order.items?.map((item, index) => (
                    <div
                      key={`${item._id || item.id || index}-${index}`}
                      className="order-item"
                    >
                      <div className="order-item-left">
                        <img
                          src={item.image || item.images?.[0]}
                          alt={item.name}
                        />
                        <div>
                          <h4>{item.name}</h4>
                          <p>Qty: {item.quantity}</p>
                          {item.category && <p>{item.category}</p>}
                        </div>
                      </div>

                      <div className="order-item-right">
                        ₹{Number(item.price || 0) * Number(item.quantity || 1)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-summary-row">
                  <div>
                    <p>Subtotal</p>
                    <h4>₹{order.subtotal}</h4>
                  </div>
                  <div>
                    <p>Shipping</p>
                    <h4>₹{order.shipping}</h4>
                  </div>
                  <div>
                    <p>Total</p>
                    <h4>₹{order.total}</h4>
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