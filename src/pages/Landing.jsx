import React from 'react';
import './Landing.css';

const Landing = () => {
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 79.99,
      description: 'Premium noise-cancelling headphones',
      image: '🎧',
    },
    {
      id: 2,
      name: 'USB-C Cable',
      price: 12.99,
      description: 'Fast charging USB-C cable',
      image: '🔌',
    },
    {
      id: 3,
      name: 'Portable Charger',
      price: 34.99,
      description: '20W portable power bank',
      image: '🔋',
    },
    {
      id: 4,
      name: 'Phone Case',
      price: 19.99,
      description: 'Durable protective phone case',
      image: '📱',
    },
    {
      id: 5,
      name: 'Screen Protector',
      price: 9.99,
      description: 'Tempered glass screen protector',
      image: '💎',
    },
    {
      id: 6,
      name: 'Wireless Mouse',
      price: 24.99,
      description: 'Ergonomic wireless mouse',
      image: '🖱️',
    },
  ];

  return (
    <div className="landing">
      <section className="hero">
        <h1>Welcome to ECommerceApp</h1>
        <p>Discover amazing products at great prices</p>
      </section>

      <section className="products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">{product.image}</div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-footer">
                <span className="price">${product.price}</span>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          ))}
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
