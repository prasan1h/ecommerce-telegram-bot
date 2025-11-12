import { useEffect } from 'react';
import { BackButton, NextButton } from '../components/NavigationButtons';
import ItemImg from '../pages/img';


const RENDER_URL = import.meta.env.VITE_RENDER_EXTERNAL_URL;

const PaymentStep = ({ 
  cartItems, 
  userData, 
  deliveryFee, 
  handlingFee, 
  platformFee, 
  totalPrice, 
  setStep, 
  handlePaymentNext ,
  selectedPayment,
}) => {

  const orderInfo = {
    userId : userData.id || 'guest',
    customer: `${userData.firstName} ${userData.lastName}`,
    address: `${userData.houseNo}, ${userData.landmark}, ${userData.city} - ${userData.postcode}, 
    ${userData.state}, ${userData.country}`,
    contact: String(`${userData.phone}`),
    items: cartItems.map(item => ({
      title: item.title,
      price: item.price,
      quantity: item.quantity
    })),
    totalAmount: totalPrice.toFixed(2),
    status: 'pending',
  };


  useEffect( () => {
      try {
    const response =  fetch(`${RENDER_URL}/server/order/addorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderInfo),
    });
      } catch (err) {
            console.error("🔥 Error sending order:", err);
  }
  }, []);

  return (
    <div className="payment-page">
      <div className="order-header">
        <h2>🧾 Order Placed </h2>
        <p>Thank you for shopping with us!</p>
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="item-list">
          {cartItems.map((item, index) => (
            <div key={index} className="item-row">
              <div className="item-info">
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


        <div className="charges">
          <div><span>Delivery Fee</span><span>₹{deliveryFee}</span></div>
          <div><span>Handling Fee</span><span>₹{handlingFee}</span></div>
          <div><span>Platform Fee</span><span>₹{platformFee}</span></div>
          <div className="total"><span>Total</span><span>₹{totalPrice.toFixed(2)}</span></div>
          <div><span>Payment Method</span><span>{userData.paymentMethod || 'UPI'}</span></div>
        </div>
      </div>


      <div className="edit-section">
        <div className="edit-header">
          <p>Name & Address</p>
          <button onClick={() => setStep('address')}>Edit</button>
        </div>
        <div className="edit-details">
          <p>userID: {userData.id}</p>
          <p>{userData.firstName} {userData.lastName}</p>
          <p>{userData.phone}</p>
          <p>{userData.address}</p>
        </div>

        <div className="edit-header">
          <p>Payment Method</p>
          <button onClick={() => setStep('payment-method')}>Edit</button>
        </div>
        <div className="edit-details">
          <p>{selectedPayment}</p>
        </div>
      </div>

      <div className="button-row">
        <BackButton onClick={() => setStep('address')} />
        <NextButton onClick={handlePaymentNext} />
      </div>
    </div>
  );
};

export default PaymentStep;