import React from 'react'
import '../assets/style.css'
import Button from './button'

const cart = ({cartItems,onCheckout}) => {
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  return (
    // <div className="cart__container">
    //   {cartItems.length === 0 ? "No items in cart" : ""}  &nbsp;
    //   <br /> <span className="">Total Price: ₹{totalPrice.toFixed(2)}</span>
    //   <Button
    //     title={`${cartItems.length === 0 ? "Order" : "Confirm!"} `}
    //     type={"checkout"}
    //     disable={cartItems.length === 0 ? true : false}
    //     onClick={onCheckout}
    //   />
    // </div>


    <div className="cart__container">
    {cartItems.length === 0 ? (
      <p>No items in cart</p>
    ) : (
      <>
        <div className="cart__items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart__item">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <hr />
        <div className="cart__total">
          <strong>Total Price: ₹{totalPrice.toFixed(2)}</strong>
        </div>
      </>
    )}
    <Button
      title={`${cartItems.length === 0 ? "Order" : "Confirm!"}`}
      type={"checkout"}
      disable={cartItems.length === 0}
      onClick={onCheckout}
    />
  </div>


  )
}

export default cart