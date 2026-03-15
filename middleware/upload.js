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

    const imagePaths =
      req.files?.images?.map((file) => `/uploads/products/${file.filename}`) || [];

    const videoPath =
      req.files?.video?.length > 0
        ? `/uploads/videos/${req.files.video[0].filename}`
        : "";

    const product = new Product({
      name,
      brand,
      category,
      subCategory,
      price: Number(price),
      salePrice: Number(salePrice) || 0,
      stock: Number(stock),
      description,
      fabric,
      color,
      sizes: sizes ? sizes.split(",").map((s) => s.trim()) : [],
      fit,
      sleeveType,
      neckType,
      pattern,
      occasion,
      washCare,
      seller: seller || null,
      images: imagePaths,
      video: videoPath,
      isPublished: true,
      isNewArrival: true,
      isTrending: makeTrending === "true" || makeTrending === true,
      trendingFeePaid: makeTrending === "true" || makeTrending === true,
      trendingApproved: makeTrending === "true" || makeTrending === true,
    });

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
      message: "Server error while creating product",
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
      req.files?.images?.map((file) => `/uploads/products/${file.filename}`) || [];

    const newVideo =
      req.files?.video?.length > 0
        ? `/uploads/videos/${req.files.video[0].filename}`
        : existingProduct.video;

    existingProduct.name = name ?? existingProduct.name;
    existingProduct.brand = brand ?? existingProduct.brand;
    existingProduct.category = category ?? existingProduct.category;
    existingProduct.subCategory = subCategory ?? existingProduct.subCategory;
    existingProduct.price = price ? Number(price) : existingProduct.price;
    existingProduct.salePrice = salePrice ? Number(salePrice) : existingProduct.salePrice;
    existingProduct.stock = stock ? Number(stock) : existingProduct.stock;
    existingProduct.description = description ?? existingProduct.description;
    existingProduct.fabric = fabric ?? existingProduct.fabric;
    existingProduct.color = color ?? existingProduct.color;
    existingProduct.sizes = sizes
      ? sizes.split(",").map((s) => s.trim())
      : existingProduct.sizes;
    existingProduct.fit = fit ?? existingProduct.fit;
    existingProduct.sleeveType = sleeveType ?? existingProduct.sleeveType;
    existingProduct.neckType = neckType ?? existingProduct.neckType;
    existingProduct.pattern = pattern ?? existingProduct.pattern;
    existingProduct.occasion = occasion ?? existingProduct.occasion;
    existingProduct.washCare = washCare ?? existingProduct.washCare;
    existingProduct.video = newVideo;

    if (newImages.length > 0) {
      existingProduct.images = newImages;
    }

    const trendingSelected = makeTrending === "true" || makeTrending === true;
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