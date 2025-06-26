import React from 'react'
import '../assets/style.css'

import pizzaImg from '../assets/img/pizza.png';
import burgerImg from '../assets/img/burger.png'
import cocaImg from '../assets/img/cocacola.png'
import saladImg from '../assets/img/salad.png'
import waterImg from '../assets/img/water.png'
import iceCreamImg from '../assets/img/icecream.png'


  const images = {
  "Pizza" : pizzaImg,
  "Burger": burgerImg,
  "Cool Drinks": cocaImg,
  "Hot Drinks": waterImg,
  "Sandwichs": iceCreamImg,
  "Snacks/Chaats": saladImg,
  "Frankie Roll": iceCreamImg,
  "Noodles": iceCreamImg,
};

const img = ({
  catTitle,
  className
}) => {

    // const Image = images[catTitle] || pizzaImg;
    const Image = images[catTitle] 

  return (
    <div>
        <img src={Image} alt="" className={className}/>
    </div>
  )
}

export default img