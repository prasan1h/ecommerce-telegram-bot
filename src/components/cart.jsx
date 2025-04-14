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
        <div className="cart__total">
          <strong>Total Price: ₹{totalPrice.toFixed(2)}</strong>
        </div>
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