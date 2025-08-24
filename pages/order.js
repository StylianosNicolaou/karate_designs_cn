import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import { useCart } from "../components/CartProvider";
import { SERVICE_CATALOG, formatPrice } from "../lib/services";
import { TrashIcon } from "@heroicons/react/24/outline";
import SEOHead from "../components/SEOHead";

export default function Order() {
  const router = useRouter();
  const { addItem, removeItem, updateQuantity, items, itemCount } = useCart();
  const [quantities, setQuantities] = useState({});
  const [addingToCart, setAddingToCart] = useState({});
  const [removingItem, setRemovingItem] = useState({});
  const [updatingQuantity, setUpdatingQuantity] = useState({});

  // Handle quantity changes
  const handleQuantityChange = (serviceId, quantity) => {
    const numQuantity = Math.max(1, Math.min(100, parseInt(quantity) || 1));
    setQuantities((prev) => ({
      ...prev,
      [serviceId]: numQuantity,
    }));
  };

  // Handle add to cart
  const handleAddToCart = async (service) => {
    const quantity = quantities[service.id] || 1;

    setAddingToCart((prev) => ({ ...prev, [service.id]: true }));

    try {
      addItem(service, quantity);

      // Brief delay for better UX
      setTimeout(() => {
        setAddingToCart((prev) => ({ ...prev, [service.id]: false }));
      }, 500);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
      setAddingToCart((prev) => ({ ...prev, [service.id]: false }));
    }
  };

  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    if (itemCount > 0) {
      router.push("/checkout");
    }
  };

  // Handle remove item from cart
  const handleRemoveItem = async (itemId) => {
    setRemovingItem((prev) => ({ ...prev, [itemId]: true }));

    try {
      removeItem(itemId);

      // Brief delay for better UX
      setTimeout(() => {
        setRemovingItem((prev) => ({ ...prev, [itemId]: false }));
      }, 500);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item from cart. Please try again.");
      setRemovingItem((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  // Handle update item quantity in cart
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 100) {
      alert("Quantity must be between 1 and 100");
      return;
    }

    setUpdatingQuantity((prev) => ({ ...prev, [itemId]: true }));

    try {
      updateQuantity(itemId, newQuantity);

      // Brief delay for better UX
      setTimeout(() => {
        setUpdatingQuantity((prev) => ({ ...prev, [itemId]: false }));
      }, 300);
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity. Please try again.");
      setUpdatingQuantity((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  return (
    <>
      <SEOHead
        title="Order Custom Designs - Karate Designs CN"
        description="Choose from our professional design services and add them to your cart. Custom karate designs, logos, and more."
        keywords="karate designs, custom designs, logo design, martial arts logo, karate logo, custom logo, logo maker, logo creator"
      />
      <Navbar />
      <main className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Design Services
            </h1>
            <p className="text-gray-300 text-lg">
              Choose from our professional design services and add them to your
              cart
            </p>
          </motion.div>

          {/* Cart Summary */}
          {itemCount > 0 && (
            <motion.div
              className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-6">
                <p className="text-white text-lg mb-4">
                  <span className="font-bold text-primary">{itemCount}</span>{" "}
                  items in your cart
                </p>
                <motion.button
                  onClick={handleProceedToCheckout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30"
                >
                  Proceed to Checkout →
                </motion.button>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Your Cart Items:
                </h3>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">
                        {item.service.name}
                      </h4>
                      <motion.button
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={removingItem[item.id]}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all disabled:opacity-50"
                        title="Remove from cart"
                      >
                        {removingItem[item.id] ? (
                          <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <TrashIcon className="w-4 h-4" />
                        )}
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-300 text-sm">Quantity:</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={
                              updatingQuantity[item.id] || item.quantity <= 1
                            }
                            className="w-6 h-6 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            -
                          </button>
                          <span className="text-white font-medium min-w-[2rem] text-center">
                            {updatingQuantity[item.id] ? (
                              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                            ) : (
                              item.quantity
                            )}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={
                              updatingQuantity[item.id] || item.quantity >= 100
                            }
                            className="w-6 h-6 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-300 text-sm">
                          {formatPrice(item.service.price)} each
                        </p>
                        <p className="text-primary font-semibold">
                          Total:{" "}
                          {formatPrice(item.service.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Service Categories */}
          <div className="space-y-12">
            {SERVICE_CATALOG.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-white mb-8 pb-3 border-b border-white/10">
                  {category.category}
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service, serviceIndex) => (
                    <motion.div
                      key={service.id}
                      className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 hover:border-primary/30 transition-all group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: categoryIndex * 0.1 + serviceIndex * 0.05,
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Service Info */}
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="text-2xl font-bold text-primary">
                          {formatPrice(service.price)}
                        </div>
                      </div>

                      {/* Quantity and Add to Cart */}
                      <div className="space-y-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center justify-between">
                          <label className="text-white text-sm font-medium">
                            Quantity:
                          </label>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  service.id,
                                  (quantities[service.id] || 1) - 1
                                )
                              }
                              className="w-8 h-8 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                              disabled={addingToCart[service.id]}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              max="100"
                              value={quantities[service.id] || 1}
                              onChange={(e) =>
                                handleQuantityChange(service.id, e.target.value)
                              }
                              className="w-16 px-2 py-1 bg-white/10 text-white text-center border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              disabled={addingToCart[service.id]}
                            />
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  service.id,
                                  (quantities[service.id] || 1) + 1
                                )
                              }
                              className="w-8 h-8 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                              disabled={addingToCart[service.id]}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Add to Cart Button */}
                        <motion.button
                          onClick={() => handleAddToCart(service)}
                          disabled={addingToCart[service.id]}
                          whileHover={{
                            scale: addingToCart[service.id] ? 1 : 1.02,
                          }}
                          whileTap={{
                            scale: addingToCart[service.id] ? 1 : 0.98,
                          }}
                          className={`w-full py-3 rounded-md font-semibold transition-all flex items-center justify-center space-x-2 ${
                            addingToCart[service.id]
                              ? "bg-green-600 text-white cursor-not-allowed"
                              : "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-primary/30"
                          }`}
                        >
                          {addingToCart[service.id] ? (
                            <>
                              <svg
                                className="animate-spin h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H17M9 19v0a2 2 0 104 0v0M15 19v0a2 2 0 104 0v0"
                                />
                              </svg>
                              <span>Add to Cart</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          {itemCount > 0 && (
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button
                onClick={handleProceedToCheckout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary text-white px-12 py-4 rounded-md font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30"
              >
                Continue to Checkout ({itemCount} items) →
              </motion.button>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
