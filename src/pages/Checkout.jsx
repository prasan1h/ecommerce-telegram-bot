import React from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/style.css';

const Checkout = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className="heading">YOUR ORDER</div>

      <div className="order-list">
        {cartItems.length === 0 ? (
          <p>No items in your order.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="order-item">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))
        )}
        <hr />
        <strong>Total: ₹{total.toFixed(2)}</strong>
      </div>

      <div className="order-comment">
        <p>Any special requests, details, wishes etc...</p>
        <textarea placeholder="Write your comment here..." className="comment-box" />
      </div>
    </>
  );
};

export default Checkout;