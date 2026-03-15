import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  clearCart,
  getCart,
  getCartSubtotal,
  getProfile,
  saveProfile,
} from "../utils/storage";

export default function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "Cash on Delivery",
  });

  useEffect(() => {
    const cart = getCart() || [];
    setCartItems(cart);

    const savedProfile = getProfile();
    if (savedProfile) {
      setFormData((prev) => ({
        ...prev,
        name: savedProfile.name || "",
        email: savedProfile.email || "",
        phone: savedProfile.phone || "",
        address: savedProfile.address || "",
        city: savedProfile.city || "",
        pincode: savedProfile.pincode || "",
      }));
    }

    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [navigate]);

  const subtotal = getCartSubtotal();
  const shipping = cartItems.length > 0 ? 99 : 0;
  const total = subtotal + shipping;

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }, [cartItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (!cartItems.length) {
      alert("Your cart is empty");
      navigate("/cart");
      return;
    }

    try {
      setLoading(true);

      saveProfile(formData);

      const formattedItems = cartItems.map((item) => ({
        product: item._id || item.product || item.id,
        quantity: item.quantity || 1,
      }));

      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
        },
        items: formattedItems,
      };

      const res = await axios.post(
        "http://localhost:5000/api/orders",
        orderData
      );

      if (res.data?.success) {
        clearCart();
        window.dispatchEvent(new Event("storageUpdate"));

        navigate("/order-success", {
          state: { order: res.data.order },
        });
      } else {
        alert(res.data?.message || "Order creation failed");
      }
    } catch (error) {
      console.error("Place order error:", error);
      alert(
        error.response?.data?.message || "Server error while placing order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f8f5f0] px-4 py-10 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <form
            onSubmit={handlePlaceOrder}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>

            <p className="mt-2 text-sm text-gray-500">
              Fill your shipping details to place the order.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="rounded-xl border p-3 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded-xl border p-3 outline-none"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="rounded-xl border p-3 outline-none"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="rounded-xl border p-3 outline-none"
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                className="rounded-xl border p-3 outline-none"
              />

              <input
                type="text"
                name="address"
                placeholder="Full Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="rounded-xl border p-3 outline-none md:col-span-2"
              />
            </div>

            <div className="mt-6 rounded-xl bg-[#f8f5f0] p-4 text-sm text-gray-700">
              Payment Method:
              <span className="ml-2 font-semibold">
                {formData.paymentMethod}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-black px-5 py-3 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>

            <div className="mt-5 space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={`${item._id || item.id}-${item.selectedSize || ""}-${index}`}
                  className="flex items-center justify-between gap-4 border-b pb-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || item.images?.[0]}
                      alt={item.name}
                      className="h-16 w-14 rounded-lg object-cover"
                    />

                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>

                      {item.selectedSize && (
                        <p className="text-xs text-gray-400">
                          Size: {item.selectedSize}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="font-semibold text-black">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t pt-4 text-gray-700">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-black">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}