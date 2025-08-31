// steps/PaymentStep.jsx
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

  // const [orderData, setOrderData] = useState({
  //   items: cartItems,
  //   totalAmount: totalPrice.toFixed(2),
  //   status: 'pending',
  // });
  const customerInfo = String(`${userData.firstName} ${userData.lastName}`);
  const phone = Number(`${userData.phone}`);
  const addressInfo = String(`${userData.houseNo}, ${userData.landmark}, ${userData.city} - ${userData.postcode}, ${userData.state}, ${userData.country}`);

  const orderInfo = {
    customer: customerInfo,
    address: addressInfo,
    contact: phone,
    items: cartItems.map(item => ({
      title: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    totalAmount: totalPrice.toFixed(2),
    status: 'pending',
  };
  console.log('customer info: ', customerInfo);
  console.log('address info: ', addressInfo);
  console.log('user data: ', userData);
  console.log('Cart Items:', cartItems);
  console.log('Order Info:', orderInfo);

  useEffect(() => {
    const response = fetch(`${RENDER_URL}/server/order/addorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderInfo),
    });
    console.log('Order submission response:', response);
  }, []);

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
          {/* <p>{userData.paymentMethod || selectedPayment}</p> */}
          <p>{selectedPayment}</p>
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