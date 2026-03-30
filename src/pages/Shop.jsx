import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { getProducts } from '../services/cartService';
import '../styles/Shop.css';

const Shop = () => {
  const { addToCart } = useCart();
  const [notification, setNotification] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('=== SHOP PAGE: Starting product fetch ===');
        console.log('API URL:', 'http://localhost:5000/api/products');
        
        const data = await getProducts();
        console.log('=== SHOP PAGE: Products received ===');
        console.log('Total count:', data ? data.length : 0);
        
        if (!data || data.length === 0) {
          console.warn('No products found in API response');
          setProducts([]);
          setError('');
          setLoading(false);
          return;
        }
        
        // Transform API products to match local format
        const transformedProducts = data.map((product) => ({
          id: product._id,
          _id: product._id,
          name: product.name,
          price: product.price,
          discount: product.discount,
          description: product.description,
          category: product.category,
          image: product.image,
          stock: product.stock,
        }));
        console.log('=== SHOP PAGE: Transformed products ===');
        console.log('Count:', transformedProducts.length);
        console.log('First product:', transformedProducts[0]);
        setProducts(transformedProducts);
        setError('');
      } catch (err) {
        console.error('=== SHOP PAGE: Fetch error ===');
        console.error('Error details:', err);
        setError('Failed to load products. Please make sure the backend server is running.');
      } finally {
        setLoading(false);
        console.log('=== SHOP PAGE: Fetch complete ===');
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const result = await addToCart(product);
    if (result?.success) {
      setNotification(`${product.name} added to cart!`);
    } else {
      setNotification(result?.message || 'Failed to add item to cart. Please try again.');
    }
    setTimeout(() => setNotification(''), 2000);
  };

  if (loading) {
    return (
      <div className="shop-container">
        <h1>Shop</h1>
        <p className="shop-intro">Loading amazing products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-container">
        <h1>Shop</h1>
        <p className="shop-intro" style={{ color: 'red', textAlign: 'center', padding: '40px' }}>
          {error}
        </p>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #d4af37 0%, #f4e6c3 100%)',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '14px'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-container">
      {notification && <div className="notification">{notification}</div>}

      <h1>Shop</h1>
      <p className="shop-intro">Browse our collection of quality products</p>

      {products.length === 0 && !loading ? (
        <div style={{textAlign: 'center', padding: '40px'}}>
          <p style={{fontSize: '18px', marginBottom: '20px'}}>No products available</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => {
            const discountedPrice = product.discount 
              ? (product.price * (1 - product.discount / 100)).toFixed(2)
              : product.price.toFixed(2);

            return (
              <div key={product.id} className="product-card">
                {product.discount > 0 && (
                  <div className="discount-badge">-{product.discount}%</div>
                )}
                <div className="product-image">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    loading="lazy"
                    onError={(e) => {
                      console.error(`Failed to load image for ${product.name}:`, product.image);
                      e.target.src = 'https://via.placeholder.com/500x500/667eea/ffffff?text=' + encodeURIComponent(product.name.substring(0, 20));
                    }}
                    onLoad={() => {
                      console.log(`Image loaded successfully for: ${product.name}`);
                    }}
                  />
                </div>
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-category">{product.category}</p>
                <div className="product-footer">
                  <div className="price-section">
                    {product.discount > 0 ? (
                      <>
                        <span className="product-price-original">${product.price.toFixed(2)}</span>
                        <span className="product-price">${discountedPrice}</span>
                      </>
                    ) : (
                      <span className="product-price">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <button
                    className="btn-add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Shop;
