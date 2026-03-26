// Cart Service - Sample products and utilities

export const sampleProducts = [
  {
    id: 1,
    name: 'Premium Laptop Pro',
    price: 2499.99,
    discount: 15,
    description: 'Ultra-thin luxury laptop with AI processor, 16" OLED display',
    category: 'Luxury Electronics',
    image: '💻',
  },
  {
    id: 2,
    name: 'Wireless Mouse Platinum',
    price: 129.99,
    discount: 20,
    description: 'Premium ergonomic wireless mouse with titanium finish',
    category: 'Luxury Accessories',
    image: '🖱️',
  },
  {
    id: 3,
    name: 'Designer USB-C Cable',
    price: 89.99,
    discount: 0,
    description: 'Luxury charging cable with gold-plated connectors',
    category: 'Premium Collection',
    image: '🔌',
  },
  {
    id: 4,
    name: 'Pro Display Monitor',
    price: 1299.99,
    discount: 10,
    description: '32" 6K Retina display with HDR - Professional grade',
    category: 'Luxury Electronics',
    image: '🖥️',
  },
  {
    id: 5,
    name: 'Mechanical Keyboard Elite',
    price: 299.99,
    discount: 25,
    description: 'Luxury mechanical keyboard with diamond switches, premium finish',
    category: 'Luxury Accessories',
    image: '⌨️',
  },
  {
    id: 6,
    name: 'Studio Pro Webcam',
    price: 699.99,
    discount: 0,
    description: '4K studio webcam with AI enhancement for professionals',
    category: 'Luxury Electronics',
    image: '📹',
  },
  {
    id: 7,
    name: 'Luxury Smartwatch',
    price: 1899.99,
    discount: 12,
    description: 'Premium titanium smartwatch with sapphire crystal display',
    category: 'Luxury Wearables',
    image: '⌚',
  },
  {
    id: 8,
    name: 'Premium Headphones',
    price: 999.99,
    discount: 18,
    description: 'Noise-canceling headphones with Hi-Fi audio, leather cushions',
    category: 'Luxury Audio',
    image: '🎧',
  },
  {
    id: 9,
    name: 'Designer Phone Pro Max',
    price: 1699.99,
    discount: 8,
    description: 'Flagship smartphone with AI capabilities and luxury finish',
    category: 'Luxury Electronics',
    image: '📱',
  },
  {
    id: 10,
    name: 'Premium Portable Speaker',
    price: 499.99,
    discount: 22,
    description: 'Luxury Bluetooth speaker with premium acoustics and design',
    category: 'Luxury Audio',
    image: '🔊',
  },
  {
    id: 11,
    name: 'Designer Camera',
    price: 2199.99,
    discount: 14,
    description: 'Professional mirrorless camera with luxury body design',
    category: 'Luxury Electronics',
    image: '📷',
  },
  {
    id: 12,
    name: 'Premium Tablet Pro',
    price: 1299.99,
    discount: 11,
    description: '12.9" luxury tablet with stylus pen and premium display',
    category: 'Luxury Electronics',
    image: '📲',
  },
  {
    id: 13,
    name: 'Gaming PC Beast',
    price: 3499.99,
    discount: 20,
    description: 'High-performance gaming PC with RTX 4090, 64GB RAM, liquid cooling',
    category: 'Gaming',
    image: '🎮',
  },
  {
    id: 14,
    name: 'Gaming Chair Pro',
    price: 599.99,
    discount: 30,
    description: 'Premium gaming chair with lumbar support and RGB lighting',
    category: 'Gaming Accessories',
    image: '🪑',
  },
  {
    id: 15,
    name: 'VR Headset Ultra',
    price: 1299.99,
    discount: 25,
    description: '4K VR headset with motion controllers and wireless connectivity',
    category: 'Gaming',
    image: '🥽',
  },
  {
    id: 16,
    name: 'Gaming Mouse RGB',
    price: 149.99,
    discount: 28,
    description: 'Ultra-responsive gaming mouse with 16K DPI and RGB effects',
    category: 'Gaming Accessories',
    image: '🖱️',
  },
  {
    id: 17,
    name: 'Gaming Headset Pro',
    price: 249.99,
    discount: 24,
    description: '7.1 surround sound gaming headset with noise cancellation',
    category: 'Gaming Audio',
    image: '🎙️',
  },
  {
    id: 18,
    name: 'Console Bundle',
    price: 799.99,
    discount: 15,
    description: 'Latest gaming console with 2 controllers and game bundle',
    category: 'Gaming',
    image: '🕹️',
  },
  {
    id: 19,
    name: 'Gaming Monitor 4K',
    price: 899.99,
    discount: 32,
    description: '27" 4K 144Hz gaming monitor with HDR and G-Sync',
    category: 'Gaming',
    image: '📺',
  },
  {
    id: 20,
    name: 'Mechanical Gaming Keyboard',
    price: 179.99,
    discount: 26,
    description: 'RGB mechanical keyboard with hot-swap switches for gaming',
    category: 'Gaming Accessories',
    image: '⌨️',
  },
];

// Utility function to get product by ID
export const getProductById = (id) => {
  return sampleProducts.find((product) => product.id === id);
};

// Utility function to validate order
export const validateOrder = (cartItems) => {
  if (!cartItems || cartItems.length === 0) {
    return { valid: false, message: 'Cart is empty' };
  }

  for (const item of cartItems) {
    if (!item.id || !item.price || !item.quantity) {
      return { valid: false, message: 'Invalid cart items' };
    }
    if (item.quantity < 1) {
      return { valid: false, message: 'Invalid quantity' };
    }
  }

  return { valid: true, message: 'Order is valid' };
};

// Utility function to process payment (mock)
export const processPayment = async (orderData) => {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      resolve({
        success: true,
        orderId: 'ORD-' + Date.now(),
        message: 'Payment processed successfully',
      });
    }, 1500);
  });
};
