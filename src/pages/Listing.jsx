import { useState,useEffect,React } from 'react'
import { useNavigate } from 'react-router-dom';

import "../assets/style.css";

import Card from "../components/card";
import Cart from '../components/cart';

import { getData } from '../db/db'; 

const tele = window.Telegram.WebApp;
const foods = getData();

const Listing = () => {

  const navigate = useNavigate();

      const [cartItems, setCartItems] = useState([]);
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
      
        // 1. Send data to Telegram bot
        tele.sendData(JSON.stringify(cartItems));
      
        // 2. Navigate to checkout page
        navigate('/checkout', { state: { cartItems } });
      };
    


  return (
    // <>
    //   <h1 className="heading">Order Food</h1>
    //   <Cart cartItems={cartItems} onCheckout={onCheckout}/>
    //   {/* <Cart cartItems={cartItems}/> */}
    //   <div className="cards__container">
    //     {foods.map((food) => {
    //       return (
    //         <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
    //       );
    //     })}
    //   </div>
    // </>

    <>
    <h1 className="heading">Order Food</h1>
    <Cart cartItems={cartItems} onCheckout={onCheckout} />
    <div className="cards__container">
      {foods.map((food) => (
        <Card
          food={food}
          key={food.id}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </div>
  </>


  );
}

export default Listing