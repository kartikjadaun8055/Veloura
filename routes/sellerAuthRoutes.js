import express from "express";
import { sellerLogin } from "../controllers/sellerAuthController.js";

const router = express.Router();

router.post("/login", sellerLogin);

export default router;