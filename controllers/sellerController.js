import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerSeller = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const seller = new User({
      name,
      email,
      password: hashedPassword,
      role: "seller",
      status: "panding",
    });

    await seller.save();

    res.json({
      success: true,
      message: "Seller registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getSellers = async (req, res) => {
  try {
    const sellers = await User.find({ role: "seller" });

    res.json({
      success: true,
      sellers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch sellers",
    });
  }
};

export const updateSellerStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const seller = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      seller,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update seller",
    });
  }
};

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
      { id: seller._id },
      process.env.JWT_SECRET || "VELOURA_SECRET",
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
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};