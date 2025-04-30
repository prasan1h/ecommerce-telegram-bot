
import { useState, useEffect, React } from 'react';
import "../assets/style.css";
import "../assets/style/address.css"
import "../assets/style/payMethod.css"
import Card from "../components/card";
import Cart from "../components/cart";

// const { userData } = require('../script/bot.cjs');
import { getData } from "../db/db";

const tele = window.Telegram.WebApp;
const foods = getData();
// const chatData = userData(ctx);

const Listing = () => {
  const [cartItems, setCartItems] = useState([]);
  const [step, setStep] = useState('listing');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    houseNo: '',
    landmark: '',
    addressType: '',
    city: '',
    state: '',
    country: '',
    postcode: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [paymentData, setPaymentData] = useState({
    upiId: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });



  useEffect(() => {
    tele.ready();
    tele.expand();
  
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    if (user) {
      setUserData((prev) => ({
        ...prev,
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: '',
        phone: '',
        houseNo: '',
        landmark: '',
        addressType: '',
        city: '',
        state: '',
        country: '',
        postcode: ''
      }));
    }

  
    const timer = setTimeout(() => {
      const confetti = document.querySelector('.confetti');
      if (confetti) confetti.classList.add('animate');
    }, 100);
  
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (step === 'completed') {
      tele.MainButton.setText('Done');
      tele.MainButton.show();
      tele.MainButton.onClick(() => tele.close());
    } else {
      tele.MainButton.hide();
    }
  }, [step]);












  const validateForm = () => {
    const errors = {};
    
    if (!userData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!userData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!userData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!userData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (userData.phone.length < 10) {
      errors.phone = 'Phone number must be at least 10 digits';
    }
    if (!userData.houseNo.trim()) {
      errors.houseNo = 'House number is required';
    }
    if (!userData.city.trim()) {
      errors.city = 'City is required';
    }
    if (!userData.state.trim()) {
      errors.state = 'State is required';
    }
    if (!userData.country.trim()) {
      errors.country = 'Country is required';
    }
    if (!userData.postcode.trim()) {
      errors.postcode = 'Post code is required';
    }
  
    setFormErrors(errors);   // update formErrors
    return Object.keys(errors).length === 0;  // true if no errors
  };
  

















  
  

  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(cartItems.map((x) =>
        x.id === food.id ? { ...x, quantity: x.quantity + 1 } : x
      ));
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(cartItems.map((x) =>
        x.id === food.id ? { ...x, quantity: x.quantity - 1 } : x
      ));
    }
  };





  

  const BackButton = ({ onClick }) => (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: '#eee',
        border: 'none',
        padding: '6px 12px',
        cursor: 'pointer',
        borderRadius: '8px',
        fontWeight: 'bold',
      }}
    >
      ← Back
    </button>
  );

  const NextButton = ({ onClick }) => (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: '#0f62fe',
        color: '#fff',
        border: 'none',
        padding: '6px 12px',
        cursor: 'pointer',
        borderRadius: '8px',
        fontWeight: 'bold',
      }}
    >
      Next →
    </button>
  );





  const totalItemPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 30;
  const handlingFee = 3;
  const platformFee = 7;
  const totalPrice = totalItemPrice + deliveryFee + handlingFee + platformFee;







  useEffect(() => {
    if (formSubmitted) {
      // Only run validations if the form has been submitted once
      if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
        setFormErrors(prev => ({ ...prev, email: 'Email is invalid' }));
      } else if (userData.email) {
        setFormErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
        });
      }
      
      // Re-validate the entire form to update error states as user edits
      validateForm();
    }
  }, [userData, formSubmitted]);



  const handleCheckoutNext = () => {
    setStep('address');
  };

  const handleAddressNext = () => {
    const isValid = validateForm();  // validate first
    
    if (!isValid) {
      setFormSubmitted(true);
      const firstErrorField = Object.keys(formErrors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }
  
    console.log("Address submitted successfully:", userData);
  
    setStep('payment-method'); // 👉 move to payment-method page
  };

  
  const handlePaymentMethodNext = () => {
    if (selectedPayment === 'upi' && paymentData.upiId.trim() === '') {
      alert('Please enter your UPI ID.');
      return;
    }
    if (selectedPayment === 'card' && (paymentData.cardNumber.trim() === '' || paymentData.expiry.trim() === '' || paymentData.cvv.trim() === '')) {
      alert('Please fill in all card details.');
      return;
    }
  
    setStep('payment'); // 👉 move to payment page
  };

  
  const handlePaymentNext = () => {
    // Optionally: sendData if needed
    // tele.sendData(JSON.stringify({ cartItems, userData }));
  
    setTimeout(() => {
      setStep('completed');
    }, 500);
  };
  




  


  return (



    <div style={{ position: 'relative', paddingTop: '50px' }}>



{/* Listing Page */}
{step === 'listing' && (
  <>
    {userData?.first_name && (
      <h1 className="heading">Hello, {userData.first_name}</h1>
    )}

    <h1 className="heading">Order Food</h1>
    <Cart cartItems={cartItems} onCheckout={() => setStep('checkout')} />
    
    <div className="cards__container">
      {Object.entries(foods).map(([categoryKey, categoryValue]) => (
        <div key={categoryKey} className="category__block">
          {/* Category Title */}
          <h2 className="category__heading">{categoryValue.title}:</h2>
          
          <div className="cards__inner__wrap">
            {categoryValue.items.map((food, index) => (
              <Card
                food={food}
                key={food.id || index}
                step={step}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </>
)}









      {/* Checkout Page */}
      {step === 'checkout' && (
      <div className="checkout-page">
    
       {/* Div 1: Back and Next buttons */}
      <div className="checkout-nav">
        <BackButton onClick={() => setStep('listing')} />
        <NextButton onClick={handleCheckoutNext} />

      </div>

      {/* Div 2: Title */}
        <div className="checkout-title">
          <h2>YOUR ORDER</h2>
        </div>

        {/* Div 3: List of Items */}
        <div className="checkout-list-wrapper">
          <ul className="checkout-list">
            {cartItems.map((food) => (
              <li className="checkout-item" key={food.id}>
                <div className="checkout-item-box">
                  <div className="item-info">
                    <img src={food.Image} alt={food.title} className="item-image" />
                    <span className="item-title">
                      {food.title} x {food.quantity}
                    </span>
                  </div>
                  <div className="item-price">
                    ₹{(food.price * food.quantity).toFixed(2)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        </div>
      )}





{step === 'address' && (
  <div className="address-page">
    <div className="checkout-nav">
      <BackButton onClick={() => setStep('checkout')} />
      {/* <NextButton className="next-btn" onClick={handlePaymentNext} /> */}
      <NextButton onClick={handleAddressNext} />
    </div>

    <div className="address-title">
      <h2>Enter Shipping Details</h2>
    </div>

    <form className="address-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-row">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          placeholder="Enter your first name"
          value={userData.firstName}
          onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
          className={formErrors.firstName ? 'invalid-input' : ''}
          required
        />
        {formErrors.firstName && <div className="error-message">{formErrors.firstName}</div>}
      </div>

      <div className="form-row">
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          placeholder="Enter your last name"
          value={userData.lastName}
          onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
          className={formErrors.lastName ? 'invalid-input' : ''}
          required
        />
        {formErrors.lastName && <div className="error-message">{formErrors.lastName}</div>}
      </div>

      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={userData.email || ''}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className={formErrors.email ? 'invalid-input' : ''}
          required
        />
        {formErrors.email && <div className="error-message">{formErrors.email}</div>}
      </div>

      <div className="form-row">
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="text" 
          placeholder="Enter your phone number"
          value={userData.phone}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/[^0-9]/g, '');
            setUserData({ ...userData, phone: onlyNums });
          }}
          className={formErrors.phone ? 'invalid-input' : ''}
          required
        />
        {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
      </div>

      <div className="form-row">
        <label htmlFor="houseNo">House No.</label>
        <input
          id="houseNo"
          type="text"
          placeholder="Enter your house number"
          value={userData.houseNo || ''}
          onChange={(e) => setUserData({ ...userData, houseNo: e.target.value })}
          className={formErrors.houseNo ? 'invalid-input' : ''}
          required
        />
        {formErrors.houseNo && <div className="error-message">{formErrors.houseNo}</div>}
      </div>

      <div className="form-row">
        <label htmlFor="landmark">Landmark</label>
        <input
          id="landmark"
          type="text"
          placeholder="Nearby landmark"
          value={userData.landmark || ''}
          onChange={(e) => setUserData({ ...userData, landmark: e.target.value })}
          className={formErrors.landmark ? 'invalid-input' : ''}
          required
        />
        {formErrors.landmark && <div className="error-message">{formErrors.landmark}</div>}
      </div>

      <div className="form-row">
        <label htmlFor="addressType">Address Type</label>
        <input
          id="addressType"
          type="text"
          placeholder="e.g., Home, Office"
          value={userData.addressType || ''}
          onChange={(e) => setUserData({ ...userData, addressType: e.target.value })}
          className={formErrors.addressType ? 'invalid-input' : ''}
          required
        />
        {formErrors.addressType && <div className="error-message">{formErrors.addressType}</div>}
      </div>

      <div className="form-row">
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          placeholder="Enter your city"
          value={userData.city}
          onChange={(e) => setUserData({ ...userData, city: e.target.value })}
          className={formErrors.city ? 'invalid-input' : ''}
          required
        />
        <label htmlFor="state">State</label>
        <input
          id="state"
          type="text"
          placeholder="Enter your state"
          value={userData.state}
          onChange={(e) => setUserData({ ...userData, state: e.target.value })}
          className={formErrors.state ? 'invalid-input' : ''}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          placeholder="Enter your country"
          value={userData.country}
          onChange={(e) => setUserData({ ...userData, country: e.target.value })}
          className={formErrors.country ? 'invalid-input' : ''}
          required
        />
        <label htmlFor="postcode">Post Code</label>
        <input
          id="postcode"
          type="text"
          placeholder="Enter your post code"
          value={userData.postcode}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/[^0-9]/g, '');
            setUserData({ ...userData, postcode: onlyNums });
          }}
          className={formErrors.postcode ? 'invalid-input' : ''}
          required
        />
        {formErrors.postcode && <div className="error-message">{formErrors.postcode}</div>}
      </div>
    </form>
  </div>
)}




{step === 'payment-method' && (
  <div className="payment-method-page">
    <BackButton onClick={() => setStep('address')} />
    <NextButton onClick={handlePaymentMethodNext} />


    <h2>Choose Payment Method</h2>

    <div className="payment-options">
      <button
        className={`payment-option ${selectedPayment === 'upi' ? 'selected' : ''}`}
        onClick={() => setSelectedPayment('upi')}
      >
        UPI
      </button>

      <button
        className={`payment-option ${selectedPayment === 'card' ? 'selected' : ''}`}
        onClick={() => setSelectedPayment('card')}
      >
        Debit/Credit Card
      </button>
    </div>

    <div className="payment-form">
      {selectedPayment === 'upi' && (
        <form>
          <label htmlFor="upiId">UPI ID</label>
          <input
            type="text"
            id="upiId"
            placeholder="example@upi"
            value={paymentData.upiId}
            onChange={(e) => setPaymentData({ ...paymentData, upiId: e.target.value })}
          />
        </form>
      )}

      {selectedPayment === 'card' && (
        <form>
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={paymentData.cardNumber}
            onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
          />

          <label htmlFor="expiry">Expiry Date</label>
          <input
            type="text"
            id="expiry"
            placeholder="MM/YY"
            value={paymentData.expiry}
            onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
          />

          <label htmlFor="cvv">CVV</label>
          <input
            type="password"
            id="cvv"
            placeholder="123"
            value={paymentData.cvv}
            onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
          />
        </form>
      )}
    </div>
  </div>
)}









     {step === 'payment' && (
<div className="payment-page">


      {/* Div 1: Header */}
      <div className="order-header">
        <h2>🧾 Order ID: #ORD123456</h2>
        <p>Thank you for shopping with us!</p>
      </div>

      {/* Div 2: Item List and Charges */}
      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="item-list">
          {cartItems.map((item, index) => (
            <div key={index} className="item-row">
              <div className="item-info">
                <img src={item.Image} alt={item.name} />
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

      {/* Div 3: Editable Fields */}
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
)}








      {/* Order Completed Page */}
      {step === 'completed' && (
            <div className="completed-page">
            <div className="confetti" />
            <div className="completed-card">
              <div className="checkmark">&#10003;</div>
              <h2>Order Placed Successfully!</h2>
              <p>Thanks for your order, <strong>{userData.firstName}</strong>!</p>
            </div>
          </div>
      )}
    </div>
  );
};





export default Listing;

