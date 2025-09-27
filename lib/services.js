// Service catalog with all available services
export const SERVICE_CATALOG = [
  {
    category: "Poster Design",
    services: [
      {
        id: "tournament-poster",
        name: "Tournament Poster",
        price: 9000, // €90.00
        description: "Professional tournament poster design",
        category: "Poster Design",
      },
      {
        id: "team-poster",
        name: "Team Poster",
        price: 7000, // €70.00
        description: "Team-focused poster design",
        category: "Poster Design",
      },
      {
        id: "seminar-poster",
        name: "Seminar Poster",
        price: 8000, // €80.00
        description: "Seminar and workshop poster design",
        category: "Poster Design",
      },
      {
        id: "custom-poster-design",
        name: "Custom Poster Design",
        price: 4500, // €45.00
        description: "Fully customized poster design",
        category: "Poster Design",
      },
    ],
  },
  {
    category: "Banner Design",
    services: [
      {
        id: "event-banner",
        name: "Event Banner",
        price: 13000, // €130.00
        description: "Large format event banner design",
        category: "Banner Design",
      },
      {
        id: "dojo-banner",
        name: "Dojo Banner",
        price: 12000, // €120.00
        description: "Dojo branding banner design",
        category: "Banner Design",
      },
      {
        id: "competition-banner",
        name: "Competition Banner",
        price: 12000, // €120.00
        description: "Competition and tournament banner",
        category: "Banner Design",
      },
    ],
  },
  {
    category: "Logo Design",
    services: [
      {
        id: "karate-dojo-logo",
        name: "Karate Dojo Logo",
        price: 14000, // €140.00
        description: "Professional dojo logo design",
        category: "Logo Design",
      },
      {
        id: "tournament-logo",
        name: "Tournament Logo",
        price: 14000, // €140.00
        description: "Tournament and event logo design",
        category: "Logo Design",
      },
      {
        id: "personal-brand-logo",
        name: "Personal Brand Logo",
        price: 12000, // €120.00
        description: "Personal branding logo design",
        category: "Logo Design",
      },
    ],
  },
  {
    category: "Merch Design",
    services: [
      {
        id: "t-shirt-design",
        name: "T-Shirt Design",
        price: 6000, // €60.00
        description: "Custom t-shirt design",
        category: "Merch Design",
      },
      {
        id: "hoodie-design",
        name: "Hoodie Design",
        price: 7000, // €70.00
        description: "Custom hoodie design",
        category: "Merch Design",
      },
      {
        id: "gi-patch-dojo-patch",
        name: "Gi Patch / Dojo Patch",
        price: 5000, // €50.00
        description: "Custom patch design for gi or dojo",
        category: "Merch Design",
      },
    ],
  },
  {
    category: "Event & Dojo Materials",
    services: [
      {
        id: "certificate-design",
        name: "Certificate Design (Belt / Participation / Achievement)",
        price: 5000, // €50.00
        description: "Professional certificate design",
        category: "Event & Dojo Materials",
      },
      {
        id: "medal-design",
        name: "Medal Design",
        price: 6000, // €60.00
        description: "Medal and ribbon design",
        category: "Event & Dojo Materials",
      },
      {
        id: "business-card-design",
        name: "Business Card Design",
        price: 4000, // €40.00
        description: "Professional business card design",
        category: "Event & Dojo Materials",
      },
      {
        id: "flyer-leaflet-double",
        name: "Flyer/Leaflet (double side)",
        price: 7000, // €70.00
        description: "Double-sided flyer design",
        category: "Event & Dojo Materials",
      },
    ],
  },
  {
    category: "Video Graphics",
    services: [
      {
        id: "video-edit",
        name: "Video Edit",
        price: 8000, // €80.00
        description: "Professional video edit",
        category: "Video Graphics",
      },
      {
        id: "tournament-promo-video",
        name: "Tournament Promo Video",
        price: 12000, // €120.00
        description: "Tournament promotional video",
        category: "Video Graphics",
      },
    ],
  },
  {
    category: "Package Deals",
    services: [
      {
        id: "dojo-basic-package",
        name: "Dojo Basic Package",
        price: 25000, // €250.00
        description:
          "8 designs per month: 5 social media posts + 3 general dojo designs. Digital formats.",
        category: "Package Deals",
      },
      {
        id: "dojo-standard-package",
        name: "Dojo Standard Package",
        price: 35000, // €350.00
        description:
          "15 designs per month: 10 social media posts + 5 general dojo designs. Priority turnaround, logo cleanups.",
        category: "Package Deals",
      },
      {
        id: "dojo-premium-package",
        name: "Dojo Premium Package",
        price: 55000, // €550.00
        description:
          "30 designs per month: 20 social media posts + 10 general dojo designs. Full branding support, priority support, unlimited revisions.",
        category: "Package Deals",
      },
    ],
  },
  {
    category: "Website Design & Creation",
    services: [
      {
        id: "website-design",
        name: "Website Design",
        price: 70000, // €700.00
        description:
          "Professional website design mockups and wireframes. Complete visual design only.",
        category: "Website Design & Creation",
      },
      {
        id: "website-creation",
        name: "Website Creation",
        price: 100000, // €1,000.00
        description:
          "Implement and develop a website from your existing design. Full coding and deployment.",
        category: "Website Design & Creation",
      },
      {
        id: "full-website-design-creation",
        name: "Full Website Design & Creation",
        price: 150000, // €1,500.00
        description:
          "Complete website solution from design to deployment. Save €200 with this package!",
        category: "Website Design & Creation",
        savings: 20000, // €200
        originalValue: 200000, // €2,000
      },
    ],
  },
];

// Utility functions
export const getServiceById = (id) => {
  for (const category of SERVICE_CATALOG) {
    const service = category.services.find((s) => s.id === id);
    if (service) return service;
  }
  return null;
};

// Validate service data
export const validateService = (service) => {
  return (
    service &&
    typeof service === "object" &&
    typeof service.id === "string" &&
    typeof service.name === "string" &&
    typeof service.price === "number" &&
    service.price > 0 &&
    typeof service.description === "string" &&
    typeof service.category === "string"
  );
};

// Format price from cents to euros
export const formatPrice = (priceInCents) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(priceInCents / 100);
};

// Calculate cart total
export const calculateCartTotal = (items) => {
  if (!Array.isArray(items)) return 0;
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

// Create cart item
const createCartItem = (service, quantity) => {
  return {
    id: `${service.id}-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`,
    serviceId: service.id,
    service,
    quantity,
    designPreferences: {},
    uploadedFiles: [],
    addedAt: new Date().toISOString(),
  };
};

// Load cart from localStorage
export const loadCart = () => {
  if (typeof window === "undefined") return null;
  try {
    const cartData = localStorage.getItem("karate-designs-cart");
    return cartData ? JSON.parse(cartData) : null;
  } catch (error) {
    console.error("Error loading cart:", error);
    return null;
  }
};

// Save cart to localStorage
export const saveCart = (cart) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("karate-designs-cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

// Clear cart from localStorage
export const clearCart = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("karate-designs-cart");
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};

// Validate cart data
export const validateCart = (cart) => {
  if (!cart || !Array.isArray(cart.items)) return false;

  return cart.items.every(
    (item) =>
      item &&
      typeof item === "object" &&
      typeof item.id === "string" &&
      typeof item.serviceId === "string" &&
      item.service &&
      validateService(item.service) &&
      typeof item.quantity === "number" &&
      item.quantity > 0 &&
      item.quantity <= 100
  );
};
