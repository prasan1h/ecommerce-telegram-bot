import { useState } from "react";

import "./App.css";
import "./assets/style.css";

import Button from "./components/button";
import Card from "./components/card";

import { getData } from './db/db'; 

const foods = getData();

function App() {
  const [cartItems, setCartItems] = useState(0);

  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if(exist){
      setCartItems(cartItems.map((x) => {
        x.id === food.id ? {...exist,quantity : exist.quantity + 1} : x ;
      }));
    }
    else{
      setCartItems([...cartItems,{...food,quantity:1}]);
    }
  }; 

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };


  return (
    <>
      <h1 className="heading">Order Food</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout}/>
      <div className="cards__container">
        {foods.map((food) => {
          return (
            <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
          );
        })}
      </div>
    </>
  );
}

export default App;
