import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, subtotal, tax, shippingCost, total } = useCart();
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [removingItemId, setRemovingItemId] = useState(null);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    setUpdatingItemId(itemId);
    await updateQuantity(itemId, newQuantity);
    setUpdatingItemId(null);
  };

  const handleRemoveFromCart = async (itemId) => {
    setRemovingItemId(itemId);
    await removeFromCart(itemId);
    setRemovingItemId(null);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some items to get started!</p>
          <button className="btn-primary" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-content">
        <h1>Shopping Cart</h1>

        <div className="cart-items-section">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className="product-image">{item.image || '📦'}</span>
                    <span>{item.name}</span>
                  </td>
                  <td className="price">${item.price.toFixed(2)}</td>
                  <td>
                    <div className="quantity-control">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={updatingItemId === item.id}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        min="1"
                        disabled={updatingItemId === item.id}
                      />
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={updatingItemId === item.id}
                      >
                        +
                      </button>
                    </div>
                    {updatingItemId === item.id && <span className="updating-indicator">Updating...</span>}
                  </td>
                  <td className="subtotal">${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn-remove"
                      onClick={() => handleRemoveFromCart(item.id)}
                      disabled={removingItemId === item.id}
                    >
                      {removingItemId === item.id ? 'Removing...' : 'Remove'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cart-summary">
          <div className="summary-section">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span className="amount">${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span className="amount">${shippingCost.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (8%):</span>
              <span className="amount">${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span className="amount">${total.toFixed(2)}</span>
            </div>

            <button
              className="btn-checkout"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
