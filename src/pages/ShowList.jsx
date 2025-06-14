// Listing.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../assets/style.css";
import "../assets/style/address.css";
import "../assets/style/payMethod.css";

// Import step components
import ListingStep from '../steps/ListingStep';
import CheckoutStep from '../steps/CheckoutStep';
import AddressStep from '../steps/AddressStep';
import PaymentMethodStep from '../steps/PaymentMethodStep';
import PaymentStep from '../steps/PaymentStep';
import CompletedStep from '../steps/CompletedStep';

import { getData } from "../db/db.cjs";

const allowedId = import.meta.env.VITE_ALLOWED_TELEGRAM_ID;
const tele = window.Telegram.WebApp;
const foods = getData();

const ShowList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [step, setStep] = useState('listing');
  const [userData, setUserData] = useState({
    id: '',
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
        id: user.id || '',
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

  // Cart functions
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

  // Validation function
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

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step handlers
  const handleCheckoutNext = () => {
    setStep('address');
  };

  const handleAddressNext = () => {
    const isValid = validateForm();
    
    if (!isValid) {
      setFormSubmitted(true);
      const firstErrorField = Object.keys(formErrors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }

    console.log("Address submitted successfully:", userData);
    setStep('payment-method');
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

    setStep('payment');
  };

  const handlePaymentNext = () => {
    setTimeout(() => {
      setStep('completed');
    }, 500);
  };

  // Calculate totals
  const totalItemPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 30;
  const handlingFee = 3;
  const platformFee = 7;
  const totalPrice = totalItemPrice + deliveryFee + handlingFee + platformFee;

  const stepProps = {
    cartItems,
    userData,
    setUserData,
    formErrors,
    setFormErrors,
    formSubmitted,
    setFormSubmitted,
    selectedPayment,
    setSelectedPayment,
    paymentData,
    setPaymentData,
    onAdd,
    onRemove,
    setStep,
    handleCheckoutNext,
    handleAddressNext,
    handlePaymentMethodNext,
    handlePaymentNext,
    validateForm,
    totalItemPrice,
    deliveryFee,
    handlingFee,
    platformFee,
    totalPrice,
    foods,
    allowedId
  };

  return (
    <div style={{ position: 'relative', paddingTop: '50px' }}>
      {step === 'listing' && <ListingStep {...stepProps} />}
      {step === 'checkout' && <CheckoutStep {...stepProps} />}
      {step === 'address' && <AddressStep {...stepProps} />}
      {step === 'payment-method' && <PaymentMethodStep {...stepProps} />}
      {step === 'payment' && <PaymentStep {...stepProps} />}
      {step === 'completed' && <CompletedStep {...stepProps} />}
    </div>
  );
};

export default ShowList;