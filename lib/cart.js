import { getServiceById } from "./services";

const CART_STORAGE_KEY = "karate_designs_cart";
const CART_EXPIRY_DAYS = 7;

// Create a new cart item
export const createCartItem = (service, quantity = 1) => ({
  id: `${service.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  serviceId: service.id,
  service: service,
  quantity: quantity,
  designPreferences: {},
  uploadedFiles: [],
  addedAt: new Date().toISOString(),
});

// Load cart from localStorage
export const loadCart = () => {
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (!cartData) return null;

    const cart = JSON.parse(cartData);

    // Check if cart has expired
    if (cart.expiresAt && new Date(cart.expiresAt) < new Date()) {
      localStorage.removeItem(CART_STORAGE_KEY);
      return null;
    }

    return cart;
  } catch (error) {
    console.error("Error loading cart:", error);
    localStorage.removeItem(CART_STORAGE_KEY);
    return null;
  }
};

// Save cart to localStorage
export const saveCart = (cart) => {
  try {
    const cartData = {
      ...cart,
      expiresAt: new Date(
        Date.now() + CART_EXPIRY_DAYS * 24 * 60 * 60 * 1000
      ).toISOString(),
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

// Clear cart from localStorage
export const clearCart = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};

// Validate cart data
export const validateCart = (cart) => {
  if (!cart || !Array.isArray(cart.items)) return false;

  return cart.items.every(
    (item) =>
      item.id &&
      item.serviceId &&
      item.service &&
      typeof item.quantity === "number" &&
      item.quantity > 0 &&
      item.quantity <= 100
  );
};

// Calculate cart total
export const calculateCartTotal = (items) => {
  return items.reduce((total, item) => {
    return total + item.service.price * item.quantity;
  }, 0);
};

// Calculate total item count
export const calculateItemCount = (items) => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

// Add item to cart
export const addItemToCart = (cart, service, quantity = 1) => {
  if (!validateService(service)) {
    throw new Error("Invalid service data");
  }

  const existingItem = cart.items.find((item) => item.serviceId === service.id);

  if (existingItem) {
    // Update quantity of existing item
    const newQuantity = existingItem.quantity + quantity;
    if (newQuantity > 100) {
      throw new Error("Maximum quantity per item is 100");
    }

    return {
      ...cart,
      items: cart.items.map((item) =>
        item.id === existingItem.id ? { ...item, quantity: newQuantity } : item
      ),
    };
  } else {
    // Add new item
    const newItem = createCartItem(service, quantity);
    return {
      ...cart,
      items: [...cart.items, newItem],
    };
  }
};

// Update item quantity
export const updateItemQuantity = (cart, itemId, quantity) => {
  if (quantity < 1 || quantity > 100) {
    throw new Error("Quantity must be between 1 and 100");
  }

  return {
    ...cart,
    items: cart.items.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    ),
  };
};

// Remove item from cart
export const removeItemFromCart = (cart, itemId) => {
  return {
    ...cart,
    items: cart.items.filter((item) => item.id !== itemId),
  };
};

// Update item design preferences
export const updateItemPreferences = (cart, itemId, preferences) => {
  return {
    ...cart,
    items: cart.items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            designPreferences: {
              ...item.designPreferences,
              ...preferences,
            },
          }
        : item
    ),
  };
};

// Update item uploaded files
export const updateItemFiles = (cart, itemId, files) => {
  return {
    ...cart,
    items: cart.items.map((item) =>
      item.id === itemId ? { ...item, uploadedFiles: files } : item
    ),
  };
};

// Get current cart state
export const getCartState = () => {
  const cart = loadCart();
  if (!cart) {
    return {
      items: [],
      total: 0,
      itemCount: 0,
      isEmpty: true,
    };
  }

  const total = calculateCartTotal(cart.items);
  const itemCount = calculateItemCount(cart.items);

  return {
    items: cart.items,
    total,
    itemCount,
    isEmpty: cart.items.length === 0,
  };
};

// Validate service data
const validateService = (service) => {
  return (
    service &&
    service.id &&
    service.name &&
    typeof service.price === "number" &&
    service.price > 0
  );
};
