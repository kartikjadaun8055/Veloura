export const getCartItems = () => {
  const items = localStorage.getItem("velouraCart");
  return items ? JSON.parse(items) : [];
};

export const saveCartItems = (items) => {
  localStorage.setItem("velouraCart", JSON.stringify(items));
};

export const addToCart = (product) => {
  const cartItems = getCartItems();

  const existingItem = cartItems.find((item) => item._id === product._id);

  let updatedCart;

  if (existingItem) {
    updatedCart = cartItems.map((item) =>
      item._id === product._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    updatedCart = [...cartItems, { ...product, quantity: 1 }];
  }

  saveCartItems(updatedCart);
  return updatedCart;
};

export const removeFromCart = (id) => {
  const cartItems = getCartItems().filter((item) => item._id !== id);
  saveCartItems(cartItems);
  return cartItems;
};

export const updateCartQuantity = (id, type) => {
  const cartItems = getCartItems().map((item) => {
    if (item._id === id) {
      const newQuantity =
        type === "increase" ? item.quantity + 1 : item.quantity - 1;

      return { ...item, quantity: newQuantity < 1 ? 1 : newQuantity };
    }
    return item;
  });

  saveCartItems(cartItems);
  return cartItems;
};