import express from "express";
import { getAdminStats, getDashboardData } from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", getAdminStats);
router.get("/dashboard", getDashboardData);

export default router;