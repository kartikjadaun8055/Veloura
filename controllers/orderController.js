import Order from "../models/Order.js";
import Product from "../models/Product.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const {
      user,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
    } = req.body;

    if (
      !shippingAddress ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Shipping address and items are required",
      });
    }

    const productIds = items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    const validatedItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const foundProduct = products.find(
        (p) => p._id.toString() === item.product.toString()
      );

      if (!foundProduct) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`,
        });
      }

      const quantity = Number(item.quantity) || 1;
      const price = Number(foundProduct.price) || 0;

      validatedItems.push({
        product: foundProduct._id,
        name: foundProduct.name,
        image: foundProduct.image || "",
        price,
        quantity,
        seller: foundProduct.seller || null,
      });

      totalAmount += price * quantity;
    }

    const order = await Order.create({
      user: user || null,
      customerName:
        customerName || shippingAddress.name || "",
      customerEmail: customerEmail || "",
      customerPhone:
        customerPhone || shippingAddress.phone || "",
      shippingAddress: {
        name: shippingAddress.name || "",
        phone: shippingAddress.phone || "",
        address: shippingAddress.address || "",
        city: shippingAddress.city || "",
        pincode: shippingAddress.pincode || "",
      },
      items: validatedItems,
      totalAmount,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("createOrder error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating order",
    });
  }
};

// GET ALL ORDERS
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .populate("items.product", "name image price")
      .populate("items.seller", "name email storeName")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("getOrders error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
    });
  }
};

// GET SELLER ORDERS
export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    const orders = await Order.find({
      "items.seller": sellerId,
    })
      .populate("user", "name email")
      .populate("items.product", "name image price")
      .sort({ createdAt: -1 });

    const filteredOrders = orders.map((order) => {
      const sellerItems = order.items.filter(
        (item) => item.seller && item.seller.toString() === sellerId
      );

      return {
        _id: order._id,
        user: order.user,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        shippingAddress: order.shippingAddress,
        items: sellerItems,
        totalAmount: sellerItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      };
    });

    res.json({
      success: true,
      orders: filteredOrders,
    });
  } catch (error) {
    console.error("getSellerOrders error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch seller orders",
    });
  }
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;

    const updatedOrder = await order.save();

    res.json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("updateOrderStatus error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating order status",
    });
  }
};