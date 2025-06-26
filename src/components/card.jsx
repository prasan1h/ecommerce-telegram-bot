// Frontend: Card component using main document ID
import React, { useEffect, useState } from 'react';
import '../assets/style.css';
import Button from './button';
import ItemImg from '../pages/img';

const tele = window.Telegram.WebApp;
const VITE_RENDER_EXTERNAL_URL = import.meta.env.VITE_RENDER_EXTERNAL_URL;
const allowedId = import.meta.env.VITE_ALLOWED_TELEGRAM_ID;

import pizzaImg from '../assets/img/pizza.png';
import burgerImg from '../assets/img/burger.png'
import cocaImg from '../assets/img/cocacola.png'
import saladImg from '../assets/img/salad.png'
import waterImg from '../assets/img/water.png'
import iceCreamImg from '../assets/img/icecream.png'


  const images = {
  Pizza : pizzaImg,
  "Burger": burgerImg,
  "Cool Drinks": cocaImg,
  "Hot Drinks": waterImg,
  "Sandwichs": iceCreamImg,
  "Snacks/Chaats": saladImg,
  "Frankie Roll": iceCreamImg,
  "Noodles": iceCreamImg,
};


const Card = ({ food, onAdd, onRemove, onDelete, step, categoryId, mainDocumentId, user, catTitle}) => {
  const [count, setCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  // const { title, Image, price, _id } = food;
  const { title, price, _id, categoryTitle } = food;


  // const selectedImage = images[title] || pizzaImg;
    // const Image = images[grp] || pizzaImg;

  const handleIncrement = () => {
    setCount(count + 1);
    onAdd(food);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
      onRemove(food);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Debug logging
      console.log('Deleting item with mainDocId:', mainDocumentId, 'categoryId:', categoryId, 'itemId:', _id);
      
      // URL includes main document ID
      const deleteUrlWithMain = `${VITE_RENDER_EXTERNAL_URL}/server/del/foods/${mainDocumentId}/${categoryId}/${_id}`;
      const deleteUrl = `${VITE_RENDER_EXTERNAL_URL}/server/del/foods/${categoryId}/${_id}`;
      console.log('DELETE URL:', deleteUrl);
      
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        onDelete(_id, categoryId);

        if (tele?.showAlert) {
          try {
            tele.showAlert('Item deleted successfully!');
          } catch {
            console.log('Item deleted successfully!');
          }
        } else {
          console.log('Item deleted successfully!');
        }
      } else {
        let errorMessage = 'Failed to delete item';

        try {
          const errorData = await response.json();
          if (errorData?.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // fallback to default message
        }

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      const errorMessage = error.message || 'Error deleting item. Please try again.';
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="card">
      <span
        key={`${step}-${_id}`}
        className={count !== 0 ? "card__badge" : "card__badge--hidden"}
      >
        {count}
      </span>

      <div className="image__container">
        {/* <img src={Image} alt={title} /> */}
        {/* <ItemImg catTitle={mapTitle}/> */}
        <ItemImg catTitle={categoryTitle}/>
      </div>
      
      <h4 className="card__title">
        {title} <br /> 
        <span className="card__price">₹ {price}</span>
      </h4>
      
      <div className="btn-container">
        <Button title={"+"} type={"add"} onClick={handleIncrement} />
        {count !== 0 && (
          <Button title={"-"} type={"remove"} onClick={handleDecrement} />
        )}
      </div>
      {Number(user) === Number(allowedId) &&  (
      <button 
        className="card__delete-btn"
        onClick={handleDelete}
        disabled={isDeleting}
        title="Delete item"
      >
        {isDeleting ? '⏳' : '🗑️'}
      </button>
      )}
    </div>
  );
};

export default Card;

// Usage: You need to pass mainDocumentId as a prop
// <Card 
//   food={item} 
//   categoryId={category._id} 
//   mainDocumentId={mainDocument._id}  // <- Add this
//   onDelete={handleDelete}
//   // ... other props
// />