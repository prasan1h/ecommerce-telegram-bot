// import { useState,useEffect,React } from 'react'
// import { useNavigate } from 'react-router-dom';

// import "../assets/style.css";

// import Card from "../components/card";
// import Cart from '../components/cart';

// import { getData } from '../db/db'; 

// const tele = window.Telegram.WebApp;
// const foods = getData();

// const Listing = () => {

//   const navigate = useNavigate();

//       const [cartItems, setCartItems] = useState([]);
//       useEffect(() => {
//         tele.ready();
//         tele.expand();
//       }, []);


//       const onAdd = (food) => {
//         const exist = cartItems.find((x) => x.id === food.id);
//         if (exist) {
//           setCartItems(cartItems.map((x) =>
//             x.id === food.id ? { ...x, quantity: x.quantity + 1 } : x
//           ));
//         } else {
//           setCartItems([...cartItems, { ...food, quantity: 1 }]);
//         }
//       };
    
//       const onRemove = (food) => {
//         const exist = cartItems.find((x) => x.id === food.id);
//         if (exist.quantity === 1) {
//           setCartItems(cartItems.filter((x) => x.id !== food.id));
//         } else {
//           setCartItems(cartItems.map((x) =>
//             x.id === food.id ? { ...x, quantity: x.quantity - 1 } : x
//           ));
//         }
//       };
    
//       const onCheckout = () => {
//         if (cartItems.length === 0) return;
      
//         // Send cart data to Telegram bot
//         tele.sendData(JSON.stringify(cartItems));
      
//         // Store cart data for the next page (persistent across reloads)
//         localStorage.setItem('cartItems', JSON.stringify(cartItems));
      
//         // Navigate to checkout page
//         navigate('/checkout', { state: { cartItems } });
//         // navigate('/checkout');
//       };


//   return (
//     // <>
//     //   <h1 className="heading">Order Food</h1>
//     //   <Cart cartItems={cartItems} onCheckout={onCheckout}/>
//     //   {/* <Cart cartItems={cartItems}/> */}
//     //   <div className="cards__container">
//     //     {foods.map((food) => {
//     //       return (
//     //         <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
//     //       );
//     //     })}
//     //   </div>
//     // </>

//     <>
//     <h1 className="heading">Order Food</h1>
//     <Cart cartItems={cartItems} onCheckout={onCheckout} />
//     <div className="cards__container">
//       {foods.map((food, index) => (
//         <Card
//           food={food}
//           key={food.id || index}
//           onAdd={onAdd}
//           onRemove={onRemove}
//         />
//       ))}
//     </div>
//   </>


//   );
// }

// export default Listing




































import { useState, useEffect, React } from 'react';
import "../assets/style.css";
import Card from "../components/card";
import Cart from "../components/cart";

// import {userData} from '../script/bot.cjs'
import { getData } from "../db/db";

const tele = window.Telegram.WebApp;
const foods = getData();
// const user = userData();

const Listing = () => {
  const [cartItems, setCartItems] = useState([]);
  const [step, setStep] = useState('listing');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    postcode: ''
  });

  useEffect(() => {
    tele.ready();
    tele.expand();
    const user = window.Telegram.WebApp.initDataUnsafe.chat;
    setUserData(user);



    const timer = setTimeout(() => {
      const confetti = document.querySelector('.confetti');
      if (confetti) confetti.classList.add('animate');
    }, 100);
    return () => clearTimeout(timer);

  }, []);

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

  const handleNext = () => {
    if (step === 'checkout') {
      setStep('address');
    } else if (step === 'address') {
      if (userData.firstName.trim() === '' || userData.lastName.trim() === '') {
        alert("Please fill out both fields.");
      }
      
      setStep('payment');
    } else if (step === 'payment') {
      tele.sendData(JSON.stringify({ cartItems, userData }));
      setStep('completed');
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
  const handlingFee = 15;
  const platformFee = 10;
  const totalPrice = totalItemPrice + deliveryFee + handlingFee + platformFee;








  return (



    <div style={{ position: 'relative', paddingTop: '50px' }}>





      {/* Listing Page */}
      {step === 'listing' && (
        <>
          {/* {userData?.first_name && (
            <h1 className="heading">Hello, {userData.first_name}</h1>
          )} */}

          <h1 className="heading">Order Food</h1>
          <Cart cartItems={cartItems} onCheckout={() => setStep('checkout')} />
          <div className="cards__container">
            {foods.map((food, index) => (
              <Card
                food={food}
                key={food.id || index}
                onAdd={onAdd}
                onRemove={onRemove}
              />
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
        <NextButton onClick={handleNext} />
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






      {/* Address Page */}
        {step === 'address' && (
        <div className="address-page">
          <div className="checkout-nav">
            <BackButton onClick={() => setStep('checkout')} />
            <NextButton onClick={handleNext} />
          </div>

          <div className="address-title">
            <h2>Enter Shipping Details</h2>
          </div>

          <form className="address-form">
            <div className="form-row">
            {/* <input
              type="text"
              placeholder="First Name"
              // value={userData.firstName}
              onChange={(e) => console.log(e.target.value)}
              required
            /> */}

              <input
                type="text"
                placeholder="First Name"
                // value={userData.lastName}
                // value=''
                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                required/>


              <input
                type="text"
                placeholder="Last Name"
                // value={userData.lastName}
                // value=''
                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                required/>
            </div>

            <div className="form-row">
              <input
                type="tel"
                placeholder="Phone Number"
                // value={userData.phone}
                // value=''
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                required/>
            </div>

            <div className="form-row">
              <input
                type="text"
                placeholder="City"
                // value={userData.city}
                // value=''
                onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                required/>
              <input
                type="text"
                placeholder="State"
                // value={userData.state}
                // value=''
                onChange={(e) => setUserData({ ...userData, state: e.target.value })}
                required/>
            </div>

            <div className="form-row">
              <input
                type="text"
                placeholder="Country"
                // value={userData.country}
                // value=''
                onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                required/>
              <input
                type="text"
                placeholder="Post Code"
                // value={userData.postcode}
                // value=''
                onChange={(e) => setUserData({ ...userData, postcode: e.target.value })}
                required/>
            </div>
          </form>
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
          <div className="total"><span>Total</span><span>₹{totalPrice}</span></div>
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
        <NextButton onClick={handleNext} />
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

