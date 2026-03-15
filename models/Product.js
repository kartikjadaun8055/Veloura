import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  brand: {
    type: String,
    default: ""
  },

  category: {
    type: String,
    enum: ["Men", "Women", "Unisex"],
    default: "Unisex"
  },

  subCategory: {
    type: String,
    default: ""
  },

  price: {
    type: Number,
    required: true
  },

  salePrice: {
    type: Number,
    default: 0
  },

  stock: {
    type: Number,
    required: true,
    default: 0
  },

  description: {
    type: String,
    default: ""
  },

  fabric: {
    type: String,
    default: ""
  },

  color: {
    type: String,
    default: ""
  },

  sizes: [
    {
      type: String
    }
  ],

  fit: {
    type: String,
    default: ""
  },

  sleeveType: {
    type: String,
    default: ""
  },

  neckType: {
    type: String,
    default: ""
  },

  pattern: {
    type: String,
    default: ""
  },

  occasion: {
    type: String,
    default: ""
  },

  washCare: {
    type: String,
    default: ""
  },

  images: [
    {
      type: String
    }
  ],

  // seller optional product video (max 15 sec frontend validation)
  video: {
    type: String,
    default: ""
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  createdByRole: {
    type: String,
    enum: ["admin", "seller"],
    default: "seller"
  },

  isPublished: {
    type: Boolean,
    default: true
  },

  // home page new arrival section
  isNewArrival: {
    type: Boolean,
    default: true
  },

  // trending section
  isTrending: {
    type: Boolean,
    default: false
  },

  // ₹3 fee paid by seller
  trendingFeePaid: {
    type: Boolean,
    default: false
  },

  // admin approval for trending
  trendingApproved: {
    type: Boolean,
    default: false
  }

},
{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;