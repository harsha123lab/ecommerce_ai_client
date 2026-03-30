import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  getCart as getCartService,
  addToCart as addToCartService,
  updateQuantity as updateQuantityService,
  removeFromCart as removeFromCartService,
  clearCart as clearCartService,
} from '../services/cartService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [taxRate] = useState(0.08); // 8% tax
  const [shippingCost] = useState(10); // Flat shipping cost
  const { isLoggedIn } = useAuth();

  // Transform cart items from API format to local format
  const transformCartItems = (items) => {
    if (!items) return [];
    return items.map((item) => ({
      id: item.productId,
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      discount: item.discount,
      image: item.image,
    }));
  };

  // Load cart from API on mount / when login state changes
  useEffect(() => {
    const fetchCart = async () => {
      if (isLoggedIn) {
        try {
          const result = await getCartService();
          if (result && result.items) {
            setCartItems(transformCartItems(result.items));
          }
        } catch (error) {
          console.error('Failed to fetch cart:', error);
        }
      } else {
        setCartItems([]);
      }
    };

    fetchCart();
  }, [isLoggedIn]);

  const addToCart = async (product) => {
    if (!isLoggedIn) {
      return { success: false, message: 'Please log in to add items to cart' };
    }

    const productId = product._id || product.id;
    try {
      const result = await addToCartService(productId, product.quantity || 1);
      if (result.success && result.cart && result.cart.items) {
        setCartItems(transformCartItems(result.cart.items));
        return { success: true };
      }
      return { success: false, message: 'Failed to add item to cart. Please try again.' };
    } catch (error) {
      console.error('Failed to add to cart:', error);
      return { success: false, message: error.message || 'Failed to add item to cart. Please try again.' };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const result = await removeFromCartService(productId);
      if (result && result.items) {
        setCartItems(transformCartItems(result.items));
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      const result = await updateQuantityService(productId, quantity);
      if (result && result.items) {
        setCartItems(transformCartItems(result.items));
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const clearCart = async () => {
    if (!isLoggedIn) {
      setCartItems([]);
      return;
    }

    try {
      await clearCartService();
      setCartItems([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  // Calculate tax
  const tax = parseFloat((subtotal * taxRate).toFixed(2));

  // Calculate total
  const total = parseFloat((subtotal + tax + shippingCost).toFixed(2));

  // Get cart count
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax,
    shippingCost,
    total,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};