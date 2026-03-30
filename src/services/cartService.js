const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

// Product functions
const getProducts = async () => {
  try {
    console.log('Fetching from:', `${API_URL}/products`);
    const res = await fetch(`${API_URL}/products`);
    console.log('Response status:', res.status);
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: 'Failed to fetch products' }));
      throw new Error(errorData.message || 'Failed to fetch products');
    }
    
    const data = await res.json();
    console.log('Raw API response:', data);
    
    // Handle different response formats
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.products)) {
      return data.products;
    } else if (data && data.success && !data.products) {
      return [];
    } else {
      console.warn('Unexpected API response format:', data);
      return data.products || [];
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.product;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
};

// Cart functions
const getCart = async () => {
  try {
    const res = await fetch(`${API_URL}/cart`, { headers: getAuthHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.cart || { items: [] };
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    return { items: [] };
  }
};

const addToCart = async (productId, quantity = 1) => {
  try {
    const res = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId, quantity }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return { success: true, cart: data.cart };
  } catch (error) {
    console.error('Failed to add to cart:', error);
    return { success: false, message: error.message || 'Failed to add to cart' };
  }
};

const updateQuantity = async (productId, quantity) => {
  try {
    const res = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ quantity }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.cart;
  } catch (error) {
    console.error('Failed to update quantity:', error);
    return null;
  }
};

const removeFromCart = async (productId) => {
  try {
    const res = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.cart;
  } catch (error) {
    console.error('Failed to remove from cart:', error);
    return null;
  }
};

const clearCart = async () => {
  try {
    const res = await fetch(`${API_URL}/cart/clear`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.cart;
  } catch (error) {
    console.error('Failed to clear cart:', error);
    return null;
  }
};

// Order functions
const placeOrder = async (customerInfo) => {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ customerInfo }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return { success: true, orderId: data.order.orderId, message: data.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const getOrders = async () => {
  try {
    const res = await fetch(`${API_URL}/orders`, { headers: getAuthHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.orders;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return [];
  }
};

// Client-side pre-validation
const validateOrder = (cartItems) => {
  if (!cartItems || cartItems.length === 0) {
    return { valid: false, message: 'Cart is empty' };
  }
  for (const item of cartItems) {
    if (!item.productId && !item.id) {
      return { valid: false, message: 'Invalid item in cart' };
    }
    if (!item.price || item.price <= 0) {
      return { valid: false, message: 'Invalid price for item' };
    }
    if (!item.quantity || item.quantity < 1) {
      return { valid: false, message: 'Invalid quantity for item' };
    }
  }
  return { valid: true };
};

const cartService = {
  getProducts,
  getProductById,
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  placeOrder,
  getOrders,
  validateOrder,
};

export default cartService;
export {
  getProducts,
  getProductById,
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  placeOrder,
  getOrders,
  validateOrder,
};
