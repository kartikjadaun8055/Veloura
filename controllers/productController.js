import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      subCategory,
      price,
      salePrice,
      stock,
      description,
      fabric,
      color,
      sizes,
      fit,
      sleeveType,
      neckType,
      pattern,
      occasion,
      washCare,
      seller,
      makeTrending,
    } = req.body;

    if (!name || !price || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, price and stock are required",
      });
    }

    const imagePaths =
      req.files?.images?.map(
        (file) => `/uploads/products/${file.filename}`
      ) || [];

    const videoPath =
      req.files?.video?.length > 0
        ? `/uploads/videos/${req.files.video[0].filename}`
        : "";

    const parsedSizes = sizes
      ? sizes.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const trendingSelected =
      makeTrending === "true" || makeTrending === true;

    const productData = {
      name,
      brand: brand || "",
      category: category || "Women",
      subCategory: subCategory || "",
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : 0,
      stock: Number(stock),
      description: description || "",
      fabric: fabric || "",
      color: color || "",
      sizes: parsedSizes,
      fit: fit || "",
      sleeveType: sleeveType || "",
      neckType: neckType || "",
      pattern: pattern || "",
      occasion: occasion || "",
      washCare: washCare || "",
      images: imagePaths,
      video: videoPath,
      isPublished: true,
      isNewArrival: true,
      isTrending: trendingSelected,
      trendingFeePaid: trendingSelected,
      trendingApproved: trendingSelected,
    };

    if (seller && seller !== "null" && seller !== "undefined") {
      productData.seller = seller;
    }

    const product = new Product(productData);

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("createProduct error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while creating product",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("getProducts error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
};

export const getPublishedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isPublished: true }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("getPublishedProducts error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching published products",
    });
  }
};

export const getSellerProducts = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const products = await Product.find({ seller: sellerId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("getSellerProducts error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching seller products",
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("getSingleProduct error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching product",
    });
  }
};

export const getMenProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isPublished: true,
      category: "Men",
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("getMenProducts error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching men products",
    });
  }
};

export const getWomenProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isPublished: true,
      category: "Women",
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("getWomenProducts error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching women products",
    });
  }
};

export const getNewArrivals = async (req, res) => {
  try {
    const products = await Product.find({
      isPublished: true,
      isNewArrival: true,
    })
      .sort({ createdAt: -1 })
      .limit(12);

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("getNewArrivals error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching new arrivals",
    });
  }
};

export const getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isPublished: true,
      isTrending: true,
      trendingFeePaid: true,
      trendingApproved: true,
    })
      .sort({ createdAt: -1 })
      .limit(12);

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("getTrendingProducts error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching trending products",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      subCategory,
      price,
      salePrice,
      stock,
      description,
      fabric,
      color,
      sizes,
      fit,
      sleeveType,
      neckType,
      pattern,
      occasion,
      washCare,
      makeTrending,
    } = req.body;

    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const newImages =
      req.files?.images?.map(
        (file) => `/uploads/products/${file.filename}`
      ) || [];

    const newVideo =
      req.files?.video?.length > 0
        ? `/uploads/videos/${req.files.video[0].filename}`
        : existingProduct.video;

    existingProduct.name = name ?? existingProduct.name;
    existingProduct.brand = brand ?? existingProduct.brand;
    existingProduct.category = category ?? existingProduct.category;
    existingProduct.subCategory = subCategory ?? existingProduct.subCategory;
    existingProduct.price = price ? Number(price) : existingProduct.price;
    existingProduct.salePrice = salePrice
      ? Number(salePrice)
      : existingProduct.salePrice;
    existingProduct.stock = stock ? Number(stock) : existingProduct.stock;
    existingProduct.description =
      description ?? existingProduct.description;
    existingProduct.fabric = fabric ?? existingProduct.fabric;
    existingProduct.color = color ?? existingProduct.color;
    existingProduct.sizes = sizes
      ? sizes.split(",").map((s) => s.trim()).filter(Boolean)
      : existingProduct.sizes;
    existingProduct.fit = fit ?? existingProduct.fit;
    existingProduct.sleeveType =
      sleeveType ?? existingProduct.sleeveType;
    existingProduct.neckType = neckType ?? existingProduct.neckType;
    existingProduct.pattern = pattern ?? existingProduct.pattern;
    existingProduct.occasion = occasion ?? existingProduct.occasion;
    existingProduct.washCare = washCare ?? existingProduct.washCare;
    existingProduct.video = newVideo;

    if (newImages.length > 0) {
      existingProduct.images = newImages;
    }

    const trendingSelected =
      makeTrending === "true" || makeTrending === true;

    existingProduct.isTrending = trendingSelected;
    existingProduct.trendingFeePaid = trendingSelected;
    existingProduct.trendingApproved = trendingSelected;

    await existingProduct.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: existingProduct,
    });
  } catch (error) {
    console.error("updateProduct error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating product",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("deleteProduct error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting product",
    });
  }
};