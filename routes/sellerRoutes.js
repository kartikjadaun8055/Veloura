import express from "express";
import {
  registerSeller,
  getSellers,
  updateSellerStatus,
  sellerLogin,
} from "../controllers/sellerController.js";

import { getSingleProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/register", registerSeller);
router.post("/login", sellerLogin);
router.get("/", getSellers);
router.put("/:id/status", updateSellerStatus);

router.get("/:id", getSingleProduct);

export default router;