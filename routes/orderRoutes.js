import express from "express";
import {
  createOrder,
  getOrders,
  getSellerOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// CREATE ORDER
router.post("/", createOrder);

// GET ALL ORDERS
router.get("/", getOrders);

// GET SELLER ORDERS
router.get("/seller/:sellerId", getSellerOrders);

// UPDATE ORDER STATUS
router.put("/:id/status", updateOrderStatus);

export default router;