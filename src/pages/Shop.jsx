import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { sampleProducts } from '../services/cartService';
import '../styles/Shop.css';

const Shop = () => {
  const { addToCart } = useCart();
  const [notification, setNotification] = useState('');

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 2000);
  };

  return (
    <div className="shop-container">
      {notification && <div className="notification">{notification}</div>}

      <h1>Shop</h1>
      <p className="shop-intro">Browse our collection of quality products</p>

      <div className="products-grid">
        {sampleProducts.map((product) => {
          const discountedPrice = product.discount 
            ? (product.price * (1 - product.discount / 100)).toFixed(2)
            : product.price.toFixed(2);

          return (
            <div key={product.id} className="product-card">
              {product.discount > 0 && (
                <div className="discount-badge">-{product.discount}%</div>
              )}
              <div className="product-image">{product.image}</div>
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
    </div>
  );
};

export default Shop;
