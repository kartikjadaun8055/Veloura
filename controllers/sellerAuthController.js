import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await User.findOne({ email, role: "seller" });

    if (!seller) {
      return res.status(400).json({
        success: false,
        message: "Seller not found",
      });
    }

    const isMatch = await bcrypt.compare(password, seller.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    if (seller.status !== "approved") {
      return res.status(403).json({
        success: false,
        message: "Seller not approved yet",
      });
    }

    const token = jwt.sign(
      { id: seller._id, role: seller.role },
      "VELOURA_SECRET",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      seller: {
        _id: seller._id,
        name: seller.name,
        email: seller.email,
      },
    });
  } catch (error) {
    console.error("Seller login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};