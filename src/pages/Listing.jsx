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
import { getData } from "../db/db";

const tele = window.Telegram.WebApp;
const foods = getData();

const Listing = () => {
  const [cartItems, setCartItems] = useState([]);
  const [step, setStep] = useState('listing'); // listing, checkout, address, payment, completed
  const [userData, setUserData] = useState({ name: '', address: '' });

  useEffect(() => {
    tele.ready();
    tele.expand();
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

  const onCheckout = () => {
    if (cartItems.length === 0) return;
    setStep('checkout');
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = () => {
    tele.sendData(JSON.stringify({ cartItems, userData }));
    setStep('completed');
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

  return (
    <div style={{ position: 'relative', paddingTop: '50px' }}>
      {/* Listing Page */}
      {step === 'listing' && (
        <>
          <h1 className="heading">Order Food</h1>
          <Cart cartItems={cartItems} onCheckout={onCheckout} />
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
          <BackButton onClick={() => setStep('listing')} />
          <h2>Checkout</h2>
          <ul>
            {cartItems.map((food) => (
              <li key={food.id}>
                {food.title} x {food.quantity} — ₹{food.price * food.quantity}
              </li>
            ))}
          </ul>
          <button onClick={() => setStep('address')}>Continue to Address</button>
        </div>
      )}

      {/* Address Page */}
      {step === 'address' && (
        <div className="address-page">
          <BackButton onClick={() => setStep('checkout')} />
          <h2>Enter Address</h2>
          <form onSubmit={handleAddressSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={userData.address}
              onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              required
            />
            <button type="submit">Proceed to Payment</button>
          </form>
        </div>
      )}

      {/* Payment Page */}
      {step === 'payment' && (
        <div className="payment-page">
          <BackButton onClick={() => setStep('address')} />
          <h2>Payment</h2>
          <p>Total: ₹{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
          <button onClick={handlePayment}>Pay and Complete Order</button>
        </div>
      )}

      {/* Order Completed Page */}
      {step === 'completed' && (
        <div className="completed-page">
          <h2>Order Placed Successfully!</h2>
          <p>Thanks for your order, {userData.name}!</p>
        </div>
      )}
    </div>
  );
};

export default Listing;
