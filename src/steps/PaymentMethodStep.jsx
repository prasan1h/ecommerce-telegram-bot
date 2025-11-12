import { BackButton, NextButton } from '../components/NavigationButtons';

const PaymentMethodStep = ({ 
  
  selectedPayment, 
  setSelectedPayment, 
  paymentData, 
  setPaymentData, 
  setStep, 
  handlePaymentMethodNext
}) => {
  return (
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
              type="number"
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={paymentData.cardNumber}
              onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
            />

            <label htmlFor="expiry">Expiry Date</label>
            <input
              type="date"
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
  );
};

export default PaymentMethodStep;