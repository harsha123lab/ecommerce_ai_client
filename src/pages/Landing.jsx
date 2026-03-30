import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/cartService';
import { useCart } from '../context/CartContext';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addingToCartId, setAddingToCartId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('=== LANDING PAGE: Fetching products ===');
        console.log('API URL:', 'http://localhost:5000/api/products');
        
        const data = await getProducts();
        console.log('=== LANDING PAGE: Products received ===');
        console.log('Total products:', data ? data.length : 0);
        console.log('First product:', data && data[0]);
        
        if (!data || data.length === 0) {
          console.warn('No products found');
          setProducts([]);
          setError('');
          setLoading(false);
          return;
        }
        
        // Take first 6 products as featured
        const featuredProducts = data.slice(0, 6).map((product) => ({
          id: product._id,
          _id: product._id,
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
          discount: product.discount,
        }));
        console.log('Featured products:', featuredProducts.length);
        setProducts(featuredProducts);
        setError('');
      } catch (err) {
        console.error('=== LANDING PAGE: Failed to fetch products ===');
        console.error('Error details:', err);
        setError('Failed to load featured products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    setAddingToCartId(product.id);
    const result = await addToCart(product);
    setAddingToCartId(null);

    if (!result?.success) {
      setError(result?.message || 'Failed to add item to cart. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="landing">
      <section className="hero">
        <h1>Welcome to ECommerceApp</h1>
        <p>Discover amazing products at great prices</p>
      </section>

      <section className="products">
        <h2>Featured Products</h2>
        {loading ? (
          <div className="loading-container">
            <p>Loading featured products...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button className="btn-retry" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-footer">
                  <span className="price">
                    {product.discount > 0 ? (
                      <>
                        <span className="original-price">${product.price.toFixed(2)}</span>
                        <span className="discounted-price">
                          ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      `$${product.price.toFixed(2)}`
                    )}
                  </span>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                    disabled={addingToCartId === product.id}
                  >
                    {addingToCartId === product.id ? 'Adding...' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="view-all-container">
          <button className="btn-view-all" onClick={() => navigate('/shop')}>
            View All Products
          </button>
        </div>
      </section>

      <section className="info">
        <div className="info-box">
          <h3>🚚 Fast Shipping</h3>
          <p>Get your orders delivered quickly</p>
        </div>
        <div className="info-box">
          <h3>💳 Secure Payment</h3>
          <p>Your transactions are safe with us</p>
        </div>
        <div className="info-box">
          <h3>✨ Quality Products</h3>
          <p>Only the best products available</p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
