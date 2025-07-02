// steps/AddressStep.jsx
import { useEffect } from 'react';
import { BackButton, NextButton } from '../components/NavigationButtons';

const AddressStep = ({ 
  userData, 
  setUserData, 
  formErrors, 
  setFormErrors,
  formSubmitted,
  setFormSubmitted,
  setStep, 
  handleAddressNext,
  validateForm,
  catTitles
}) => {
  
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
  }, [userData, formSubmitted, setFormErrors, validateForm]);

  return (
    <div className="address-page">
      <div className="checkout-nav">
        <BackButton onClick={() => setStep('checkout')} />
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
            type="number"
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
  );
};

export default AddressStep;