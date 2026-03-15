import express from "express";
// import upload from "../middleware/upload.js";
import {
  createProduct,
  getSellerProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "video", maxCount: 1 },
  ]),
  createProduct
);

router.get("/seller/:sellerId", getSellerProducts);

router.get("/:id", getSingleProduct);

router.put(
  "/:id",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "video", maxCount: 1 },
  ]),
  updateProduct
);

export default router;