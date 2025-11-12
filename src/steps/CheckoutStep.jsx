import { BackButton, NextButton } from '../components/NavigationButtons';
import ItemImg from '../pages/img';

const CheckoutStep = ({ 
  cartItems, 
  setStep, 
  handleCheckoutNext ,
  catTitles
}) => {
  return (
    <div className="checkout-page">
      <div className="checkout-nav">
        <BackButton onClick={() => setStep('listing')} />
        <NextButton onClick={handleCheckoutNext} />
      </div>

      <div className="checkout-title">
        <h2>YOUR ORDER</h2>
      </div>


      <div className="checkout-list-wrapper">
        <ul className="checkout-list">
          {cartItems.map((food) => (
            
            <li className="checkout-item" key={food.id}>
              <div className="checkout-item-box">
                <div className="item-info">
                  <ItemImg catTitle={food.categoryTitle} className="item-image"/>
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
  );
};

export default CheckoutStep;