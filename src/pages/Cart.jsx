import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getCart,
  updateCartQuantity,
  removeFromCart,
  getCartSubtotal,
} from "../utils/storage";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const loadCart = () => {
    const cartData = getCart() || [];
    setCart(cartData);
  };

  useEffect(() => {
    loadCart();

    window.addEventListener("storageUpdate", loadCart);
    window.addEventListener("storage", loadCart);

    return () => {
      window.removeEventListener("storageUpdate", loadCart);
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  const handleDecrease = (id) => {
    updateCartQuantity(id, "dec");
    loadCart();
  };

  const handleIncrease = (id) => {
    updateCartQuantity(id, "inc");
    loadCart();
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    loadCart();
  };

  const subtotal = getCartSubtotal();
  const shipping = cart.length > 0 ? 99 : 0;
  const total = subtotal + shipping;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f8f5f0] px-4 md:px-8 py-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl md:text-4xl font-bold text-[#2f1e14]">
            Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800">
                Your Cart is Empty
              </h2>
              <p className="mt-3 text-gray-500">
                Add some premium products to continue shopping.
              </p>

              <Link
                to="/products"
                className="mt-6 inline-block rounded-xl bg-black px-6 py-3 text-white hover:opacity-90 transition"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="space-y-5 lg:col-span-2">
                {cart.map((item, index) => (
                  <div
                    key={item._id || item.id || index}
                    className="rounded-2xl bg-white p-4 shadow-sm md:flex md:items-center md:justify-between"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image || item.images?.[0]}
                        alt={item.name}
                        className="h-28 w-24 rounded-xl object-cover"
                      />

                      <div>
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                          {item.name}
                        </h2>

                        {item.category && (
                          <p className="mt-1 text-sm text-gray-500">
                            {item.category}
                          </p>
                        )}

                        {item.selectedSize && (
                          <p className="mt-1 text-sm text-gray-500">
                            Size: {item.selectedSize}
                          </p>
                        )}

                        <p className="mt-3 font-bold text-black">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3 md:mt-0">
                      <div className="flex items-center overflow-hidden rounded-lg border">
                        <button
                          onClick={() => handleDecrease(item._id || item.id)}
                          className="px-3 py-1 text-lg hover:bg-gray-100"
                        >
                          -
                        </button>

                        <span className="min-w-[40px] text-center font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => handleIncrease(item._id || item.id)}
                          className="px-3 py-1 text-lg hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item._id || item.id)}
                        className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-24">
                <h2 className="text-2xl font-bold text-gray-800">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>

                  <div className="flex justify-between border-t pt-3 text-lg font-bold text-black">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="mt-6 w-full rounded-xl bg-black px-5 py-3 text-white hover:opacity-90 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}