import React, {useState} from 'react'

import '../assets/style.css'

import Button from './button'

const tele = window.Telegram.WebApp;

const card = ({food,onAdd,onRemove}) => {

    const [count,setCount] = useState(0);
    const {title,Image,price,id} = food;

    const handleIncrement = () => {
        setCount(count+1);
        onAdd(food);

    }

    const handleDecrement = () => {
        setCount(count-1);
        onRemove(food);
    }

    const onCheckout = () => {
          tele.MainButton.text = "Checkout :)";
          
          if(count >= 1){
          tele.MainButton.show();
          }
          else if(count = 0){
            tele.MainButton.hide();
          }
        };

    // if(count >= 1){
    //   onCheckout();
    // }
    // else{
    //   tele.MainButton.hide();
    // }


  return (
    <div className="card">
      <span
        className={`${count !== 0 ? "card__badge" : "card__badge--hidden"}`}
      >
        {count}
      </span>
      <div className="image__container">
        <img src={Image} alt={title} />
      </div>
      <h4 className="card__title">
        {title}  <br /> <span className="card__price">₹ {price}</span>
      </h4>

      <div className="btn-container">
        <Button title={"+"} type={"add"} onClick={handleIncrement} onCheckout={onCheckout}/>
        {count !== 0 ? (
          <Button title={"-"} type={"remove"} onClick={handleDecrement} onCheckout={onCheckout}/>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default card