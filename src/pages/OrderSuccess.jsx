import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/OrderSuccess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId || 'N/A';

  return (
    <div className="order-success-container">
      <div className="success-content">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase.</p>

        <div className="order-details">
          <p>
            <strong>Order ID:</strong> {orderId}
          </p>
          <p>
            <strong>Status:</strong> <span className="status-success">Confirmed</span>
          </p>
          <p>
            <strong>Delivery:</strong> Estimated in 5-7 business days
          </p>
          <p>
            A confirmation email has been sent to your registered email address.
          </p>
        </div>

        <div className="success-actions">
          <button className="btn-primary" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
          <button className="btn-secondary" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
