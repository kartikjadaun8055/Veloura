import { getOrders } from "../utils/storage";

export default function OrderHistoryPage() {
  const orders = getOrders();

  return (
    <div className="min-h-screen bg-[#f8f5f0] px-4 md:px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800">Order History</h1>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-gray-500">No orders placed yet.</p>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{order.id}</h2>
                    <p className="text-sm text-gray-500">{order.createdAt}</p>
                  </div>
                  <div className="mt-3 md:mt-0">
                    <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex justify-between border-b pb-2">
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-right text-lg font-bold">
                  Total: ₹{order.total}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}