import { createContext, useContext, useReducer, useEffect } from "react";
import {
  loadCart,
  saveCart,
  clearCart as clearCartStorage,
  addItemToCart as addItemToCartUtil,
  updateItemQuantity as updateItemQuantityUtil,
  removeItemFromCart as removeItemFromCartUtil,
  updateItemPreferences as updateItemPreferencesUtil,
  updateItemFiles as updateItemFilesUtil,
  calculateCartTotal,
  calculateItemCount,
} from "../lib/cart";

// Cart context
const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART": {
      const cart = action.payload;
      return {
        ...state,
        items: cart?.items || [],
        total: calculateCartTotal(cart?.items || []),
        itemCount: calculateItemCount(cart?.items || []),
        isEmpty: !cart?.items || cart.items.length === 0,
        isLoading: false,
      };
    }

    case "ADD_ITEM": {
      const { service, quantity } = action.payload;
      const updatedCart = addItemToCartUtil(state, service, quantity);
      const newState = {
        ...state,
        items: updatedCart.items,
        total: calculateCartTotal(updatedCart.items),
        itemCount: calculateItemCount(updatedCart.items),
        isEmpty: updatedCart.items.length === 0,
      };

      // Save to localStorage
      saveCart(newState);
      return newState;
    }

    case "UPDATE_QUANTITY": {
      const { itemId, quantity } = action.payload;
      const updatedCart = updateItemQuantityUtil(state, itemId, quantity);
      const newState = {
        ...state,
        items: updatedCart.items,
        total: calculateCartTotal(updatedCart.items),
        itemCount: calculateItemCount(updatedCart.items),
        isEmpty: updatedCart.items.length === 0,
      };

      // Save to localStorage
      saveCart(newState);
      return newState;
    }

    case "REMOVE_ITEM": {
      const { itemId } = action.payload;
      const updatedCart = removeItemFromCartUtil(state, itemId);
      const newState = {
        ...state,
        items: updatedCart.items,
        total: calculateCartTotal(updatedCart.items),
        itemCount: calculateItemCount(updatedCart.items),
        isEmpty: updatedCart.items.length === 0,
      };

      // Save to localStorage
      saveCart(newState);
      return newState;
    }

    case "UPDATE_PREFERENCES": {
      const { itemId, preferences } = action.payload;
      const updatedCart = updateItemPreferencesUtil(state, itemId, preferences);
      const newState = {
        ...state,
        items: updatedCart.items,
      };

      // Save to localStorage
      saveCart(newState);
      return newState;
    }

    case "UPDATE_FILES": {
      const { itemId, files } = action.payload;
      const updatedCart = updateItemFilesUtil(state, itemId, files);
      const newState = {
        ...state,
        items: updatedCart.items,
      };

      // Save to localStorage
      saveCart(newState);
      return newState;
    }

    case "CLEAR_CART": {
      clearCartStorage();
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
        isEmpty: true,
      };
    }

    case "SET_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  isEmpty: true,
  isLoading: true,
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCartData = () => {
      try {
        const cart = loadCart();
        dispatch({ type: "LOAD_CART", payload: cart });
      } catch (error) {
        console.error("Error loading cart:", error);
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    loadCartData();
  }, []);

  // Cart actions
  const addItem = (service, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { service, quantity } });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, quantity } });
  };

  const removeItem = (itemId) => {
    dispatch({ type: "REMOVE_ITEM", payload: { itemId } });
  };

  const updatePreferences = (itemId, preferences) => {
    dispatch({ type: "UPDATE_PREFERENCES", payload: { itemId, preferences } });
  };

  const updateFiles = (itemId, files) => {
    dispatch({ type: "UPDATE_FILES", payload: { itemId, files } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // Clear cart after successful payment
  const clearCartAfterPayment = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getItemById = (itemId) => {
    return state.items.find((item) => item.id === itemId);
  };

  const getItemByServiceId = (serviceId) => {
    return state.items.find((item) => item.serviceId === serviceId);
  };

  const value = {
    // State
    items: state.items,
    total: state.total,
    itemCount: state.itemCount,
    isEmpty: state.isEmpty,
    isLoading: state.isLoading,

    // Actions
    addItem,
    updateQuantity,
    removeItem,
    updatePreferences,
    updateFiles,
    clearCart,
    clearCartAfterPayment,

    // Utilities
    getItemById,
    getItemByServiceId,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
