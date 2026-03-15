import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getSellerStats = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    const totalProducts = await Product.countDocuments({ seller: sellerId });

    const sellerOrders = await Order.find({
      "items.seller": sellerId,
    });

    const totalOrders = sellerOrders.length;

    const pendingOrders = sellerOrders.filter(
      (order) => order.status === "Pending"
    ).length;

    let totalRevenue = 0;

    sellerOrders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.seller?.toString() === sellerId.toString()) {
          totalRevenue += item.price * item.quantity;
        }
      });
    });

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        pendingOrders,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error("Seller stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch seller stats",
    });
  }
};