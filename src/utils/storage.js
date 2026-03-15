const CART_KEY = "veloura_cart";
const WISHLIST_KEY = "veloura_wishlist";
const ORDERS_KEY = "veloura_orders";
const PROFILE_KEY = "veloura_profile";
const REVIEWS_KEY = "veloura_reviews";

const emitUpdate = () => {
  window.dispatchEvent(new Event("storageUpdate"));
};

/* ---------------- SAFE STORAGE ---------------- */

const getStorage = (key, defaultValue) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
  } catch {
    return defaultValue;
  }
};

/* ---------------- CART ---------------- */

export const getCart = () => {
  return getStorage(CART_KEY, []);
};

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  emitUpdate();
};

export const addToCart = (product) => {
  const cart = getCart();

  const existingIndex = cart.findIndex(
    (item) =>
      item._id === product._id &&
      item.selectedSize === product.selectedSize
  );

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += product.quantity || 1;
  } else {
    cart.push({
      ...product,
      quantity: product.quantity || 1,
    });
  }

  saveCart(cart);
};

export const updateCartQuantity = (_id, selectedSize, type) => {
  const updatedCart = getCart().map((item) => {
    if (item._id === _id && item.selectedSize === selectedSize) {
      const newQty =
        type === "inc"
          ? item.quantity + 1
          : Math.max(1, item.quantity - 1);

      return { ...item, quantity: newQty };
    }
    return item;
  });

  saveCart(updatedCart);
};

export const removeFromCart = (_id, selectedSize) => {
  const cart = getCart().filter(
    (item) => !(item._id === _id && item.selectedSize === selectedSize)
  );

  saveCart(cart);
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  emitUpdate();
};

export const getCartCount = () => {
  return getCart().reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0
  );
};

export const getCartSubtotal = () => {
  return getCart().reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );
};

/* ---------------- WISHLIST ---------------- */

export const getWishlist = () => {
  return getStorage(WISHLIST_KEY, []);
};

export const saveWishlist = (wishlist) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  emitUpdate();
};

export const toggleWishlist = (product) => {
  let wishlist = getWishlist();

  const exists = wishlist.find((item) => item._id === product._id);

  if (exists) {
    wishlist = wishlist.filter((item) => item._id !== product._id);
  } else {
    wishlist.push(product);
  }

  saveWishlist(wishlist);
};

export const isInWishlist = (_id) => {
  return getWishlist().some((item) => item._id === _id);
};

export const getWishlistCount = () => {
  return getWishlist().length;
};

/* ---------------- REVIEWS ---------------- */

export const getReviews = (productId) => {
  const reviews = getStorage(REVIEWS_KEY, {});
  return reviews[productId] || [];
};

export const addReview = (productId, review) => {
  const reviews = getStorage(REVIEWS_KEY, {});

  if (!reviews[productId]) {
    reviews[productId] = [];
  }

  reviews[productId].unshift(review);

  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  emitUpdate();
};

/* ---------------- ORDERS ---------------- */

export const saveOrder = (orderData) => {
  const orders = getStorage(ORDERS_KEY, []);

  orders.unshift({
    id: Date.now(),
    createdAt: new Date().toLocaleString(),
    ...orderData,
  });

  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  emitUpdate();
};

export const getOrders = () => {
  return getStorage(ORDERS_KEY, []);
};

/* ---------------- PROFILE ---------------- */

export const saveProfile = (profile) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  emitUpdate();
};

export const getProfile = () => {
  return getStorage(PROFILE_KEY, {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
};