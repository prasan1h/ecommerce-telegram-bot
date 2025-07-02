import React from 'react';
import '../assets/style.css';
// steps/CompletedStep.jsx
const CompletedStep = ({ userData }) => {
  return (
    <div className="completed-page">
      <div className="confetti" />
      <div className="completed-card">
        <div className="checkmark">&#10003;</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thanks for your order, <strong>{userData.firstName}</strong>!</p>
        <button className="reloadbtn" onClick={() => window.location.reload()}>
          Visit Home
      </button>
      </div>
    </div>
  );
};

export default CompletedStep;