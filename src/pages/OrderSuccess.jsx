import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#f8f5f0] px-4 py-16 flex items-center justify-center">
        <div className="w-full max-w-3xl rounded-2xl bg-white p-8 md:p-10 shadow-sm text-center">

          {/* SUCCESS ICON */}

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#8B4513] text-4xl text-white">
            ✓
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-[#2f1e14]">
            Order Placed Successfully
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] md:text-lg leading-7 text-[#6b5b4f]">
            Thank you for shopping with Veloura. Your order has been placed and
            will be delivered soon.
          </p>

          {/* IF ORDER DATA NOT FOUND */}

          {!order ? (
            <div className="mt-8 rounded-xl bg-[#f5f1ea] p-5 text-center">
              <p className="text-lg font-semibold text-[#2f1e14]">
                No order details found
              </p>

              <p className="mt-2 text-sm text-[#6b5b4f]">
                It looks like this page was opened directly.
              </p>

              <div className="mt-5 flex justify-center gap-3 flex-wrap">
                <Link
                  to="/products"
                  className="rounded-xl bg-black px-6 py-3 text-white"
                >
                  Continue Shopping
                </Link>

                <Link
                  to="/"
                  className="rounded-xl border border-black px-6 py-3"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* ORDER DETAILS */}

              <div className="mt-8 rounded-xl bg-[#f5f1ea] p-5 text-left text-[#4e3d32]">

                <p className="mb-2">
                  <span className="font-semibold">Order ID:</span> {order.id}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Date:</span> {order.createdAt}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Total:</span> ₹{order.total}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Status:</span> {order.status}
                </p>

                <p>
                  <span className="font-semibold">Estimated Delivery:</span>{" "}
                  3 - 5 business days
                </p>

              </div>

              {/* ACTION BUTTONS */}

              <div className="mt-8 flex flex-wrap justify-center gap-4">

                <Link
                  to="/orders"
                  className="rounded-xl bg-[#8B4513] px-6 py-3 text-white"
                >
                  View Orders
                </Link>

                <Link
                  to="/products"
                  className="rounded-xl border border-[#8B4513] px-6 py-3 text-[#8B4513]"
                >
                  Continue Shopping
                </Link>

                <Link
                  to="/"
                  className="rounded-xl border border-black px-6 py-3"
                >
                  Back to Home
                </Link>

              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}