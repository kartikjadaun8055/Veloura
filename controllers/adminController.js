import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
// import Productmodel from "../models/Productmodel.js";

// ADMIN STATS
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalSellers = await User.countDocuments({ role: "seller" });

    const pendingSellers = await User.countDocuments({
      role: "seller",
      status: "pending",
    });

    const approvedSellers = await User.countDocuments({
      role: "seller",
      status: "approved",
    });

    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce((sum, order) => {
      return sum + (order.totalAmount || order.totalPrice || order.amount || 0);
    }, 0);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalSellers,
        pendingSellers,
        approvedSellers,
        totalProducts,
        totalOrders,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error("getAdminStats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin stats",
    });
  }
};

// DASHBOARD DATA
export const getDashboardData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalSellers = await User.countDocuments({ role: "seller" });

    const pendingSellers = await User.countDocuments({
      role: "seller",
      status: "pending",
    });

    const approvedSellers = await User.countDocuments({
      role: "seller",
      status: "approved",
    });

    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const allOrders = await Order.find().sort({ createdAt: -1 });

    const totalRevenue = allOrders.reduce((sum, order) => {
      return sum + (order.totalAmount || order.totalPrice || order.amount || 0);
    }, 0);

    const pendingOrders = await Order.countDocuments({ status: "Pending" });

    const recentOrders = allOrders.slice(0, 5).map((order, index) => ({
      _id: order._id,
      orderId: order.orderId || `ORD-${index + 1}`,
      customerName:
        order.customerName ||
        order.shippingAddress?.fullName ||
        order.user?.name ||
        "Customer",
      amount: `₹${order.totalAmount || order.totalPrice || order.amount || 0}`,
      status: order.status || "Pending",
    }));

    const stats = [
      { title: "Users", value: totalUsers, subtext: "Registered users" },
      { title: "Total Sellers", value: totalSellers, subtext: "All sellers" },
      { title: "Pending Sellers", value: pendingSellers, subtext: "Waiting approval" },
      { title: "Approved Sellers", value: approvedSellers, subtext: "Approved sellers" },
      { title: "Products", value: totalProducts, subtext: "Available products" },
      { title: "Orders", value: totalOrders, subtext: "Total orders" },
    ];

    const summary = {
      totalRevenue: `₹${totalRevenue}`,
      pendingOrders,
      lowStockProducts: 0,
      newSellers: 0,
    };

    const chartData = [
      { label: "Jan", value: 12000 },
      { label: "Feb", value: 18000 },
      { label: "Mar", value: 22000 },
      { label: "Apr", value: 16000 },
      { label: "May", value: 25000 },
    ];

    res.status(200).json({
      success: true,
      stats,
      recentOrders,
      summary,
      chartData,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
};