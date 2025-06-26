// steps/PaymentStep.jsx
import { BackButton, NextButton } from '../components/NavigationButtons';
import ItemImg from '../pages/img';

const PaymentStep = ({ 
  cartItems, 
  userData, 
  deliveryFee, 
  handlingFee, 
  platformFee, 
  totalPrice, 
  setStep, 
  handlePaymentNext ,
  catTitles
}) => {
  return (
    <div className="payment-page">
      {/* Header */}
      <div className="order-header">
        <h2>🧾 Order ID: #ORD123456</h2>
        <p>Thank you for shopping with us!</p>
      </div>

      {/* Item List and Charges */}
      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="item-list">
          {cartItems.map((item, index) => (
            <div key={index} className="item-row">
              <div className="item-info">
                {/* <img src={item.Image} alt={item.name} /> */}
                <ItemImg catTitle={item.categoryTitle}/>
                <div>
                  <p className="item-name">{item.name}</p>
                  <p className="item-qty">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="item-price">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        {/* Charges */}
        <div className="charges">
          <div><span>Delivery Fee</span><span>₹{deliveryFee}</span></div>
          <div><span>Handling Fee</span><span>₹{handlingFee}</span></div>
          <div><span>Platform Fee</span><span>₹{platformFee}</span></div>
          <div className="total"><span>Total</span><span>₹{totalPrice.toFixed(2)}</span></div>
          <div><span>Payment Method</span><span>{userData.paymentMethod || 'UPI'}</span></div>
        </div>
      </div>

      {/* Editable Fields */}
      <div className="edit-section">
        <div className="edit-header">
          <p>Name & Address</p>
          <button onClick={() => setStep('address')}>Edit</button>
        </div>
        <div className="edit-details">
          <p>{userData.firstName} {userData.lastName}</p>
          <p>{userData.phone}</p>
          <p>{userData.address}</p>
        </div>

        <div className="edit-header">
          <p>Payment Method</p>
          <button onClick={() => setStep('payment-method')}>Edit</button>
        </div>
        <div className="edit-details">
          <p>{userData.paymentMethod || 'UPI'}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="button-row">
        <BackButton onClick={() => setStep('address')} />
        <NextButton onClick={handlePaymentNext} />
      </div>
    </div>
  );
};

export default PaymentStep;