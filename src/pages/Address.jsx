import React, { useState, useEffect } from 'react';
import "../assets/style/address.css"

const Address = (props) => {
  const [step, setStep] = useState('address');
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
  
  // State for form errors
  const [formErrors, setFormErrors] = useState({});
  
  // Add a state to track if form has been submitted
  const [formSubmitted, setFormSubmitted] = useState(false);

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
  
    setFormErrors(errors);   // update formErrors
    return Object.keys(errors).length === 0;  // true if no errors
  };
  

  // Handle Next button click
  const handleNext = () => {
    // Set the form as submitted
    setFormSubmitted(true);
    
    if (validateForm()) {
      setStep('payment'); // or whatever the next step is
      console.log("Form submitted successfully:", userData);
      
      // Call the callback function if provided as prop
      if (props.onAddressSubmit) {
        props.onAddressSubmit(userData);
      }
    } else {
      // Focus on the first field with an error
      const firstErrorField = Object.keys(formErrors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
    }
  };

  // Simple Back button component
  const BackButton = ({ onClick }) => (
    <button type="button" onClick={onClick} className="back-btn">
      Back
    </button>
  );

  // Simple Next button component
  const NextButton = ({ onClick, className }) => (
    <button type="button" onClick={onClick} className={className}>
      Next
    </button>
  );

  // Real-time validation for email after form is submitted
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

  return (
    <div className="address-container">
      {step === 'address' && (
        <div className="address-page">
          <div className="checkout-nav">
            <BackButton onClick={() => setStep('checkout')} />
            <NextButton className="next-btn" onClick={handleNext} />
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
                className={formSubmitted && formErrors.firstName ? 'invalid-input' : ''}
                required
              />
              {formSubmitted && formErrors.firstName && <div className="error-message">{formErrors.firstName}</div>}
            </div>

            <div className="form-row">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                value={userData.lastName}
                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                className={formSubmitted && formErrors.lastName ? 'invalid-input' : ''}
                required
              />
              {formSubmitted && formErrors.lastName && <div className="error-message">{formErrors.lastName}</div>}
            </div>

            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={userData.email || ''}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className={formSubmitted && formErrors.email ? 'invalid-input' : ''}
                required
              />
              {formSubmitted && formErrors.email && <div className="error-message">{formErrors.email}</div>}
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
                className={formSubmitted && formErrors.phone ? 'invalid-input' : ''}
                required
              />
              {formSubmitted && formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
            </div>

            <div className="form-row">
              <label htmlFor="houseNo">House No.</label>
              <input
                id="houseNo"
                type="text"
                placeholder="Enter your house number"
                value={userData.houseNo || ''}
                onChange={(e) => setUserData({ ...userData, houseNo: e.target.value })}
                className={formSubmitted && formErrors.houseNo ? 'invalid-input' : ''}
                required
              />
              {formSubmitted && formErrors.houseNo && <div className="error-message">{formErrors.houseNo}</div>}
            </div>

            <div className="form-row">
              <label htmlFor="landmark">Landmark</label>
              <input
                id="landmark"
                type="text"
                placeholder="Nearby landmark"
                value={userData.landmark || ''}
                onChange={(e) => setUserData({ ...userData, landmark: e.target.value })}
                className={formSubmitted && formErrors.landmark ? 'invalid-input' : ''}
                required
              />
              {formSubmitted && formErrors.landmark && <div className="error-message">{formErrors.landmark}</div>}
            </div>

            <div className="form-row">
              <label htmlFor="addressType">Address Type</label>
              <input
                id="addressType"
                type="text"
                placeholder="e.g., Home, Office"
                value={userData.addressType || ''}
                onChange={(e) => setUserData({ ...userData, addressType: e.target.value })}
                className={formSubmitted && formErrors.addressType ? 'invalid-input' : ''}
                required
              />
              {formSubmitted && formErrors.addressType && <div className="error-message">{formErrors.addressType}</div>}
            </div>

            <div className="form-row">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                placeholder="Enter your city"
                value={userData.city}
                onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                className={formSubmitted && formErrors.city ? 'invalid-input' : ''}
                required
              />
              <label htmlFor="state">State</label>
              <input
                id="state"
                type="text"
                placeholder="Enter your state"
                value={userData.state}
                onChange={(e) => setUserData({ ...userData, state: e.target.value })}
                className={formSubmitted && formErrors.state ? 'invalid-input' : ''}
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
                className={formSubmitted && formErrors.country ? 'invalid-input' : ''}
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
                className={formSubmitted && formErrors.postcode ? 'invalid-input' : ''}
                required
              />
              {formSubmitted && formErrors.postcode && <div className="error-message">{formErrors.postcode}</div>}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Address;