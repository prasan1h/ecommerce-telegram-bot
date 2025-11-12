import React from 'react'
import '../assets/style.css'

import pizzaImg from '../assets/img/pizza.png';
import burgerImg from '../assets/img/burger.png'
import cocaImg from '../assets/img/cocacola.png'
import startersImg from '../assets/img/starters.png'
import friedRiceImg from '../assets/img/friedrice.png'
import iceCreamImg from '../assets/img/icecream.png'
import frankieRollImg from '../assets/img/frankieroll.png'
import snacksImg from '../assets/img/frenchfries.png'
import soupImg from '../assets/img/hotsoups.png'
import hotDrinkImg from '../assets/img/hotdrinks.png'
import noodlesImg from '../assets/img/noodles.png'
import sandwichImg from '../assets/img/sandwich.png'
import juiceImg from '../assets/img/juice.png'
import milkshakeImg from '../assets/img/milkshake.png'
import pavBhajiImg from '../assets/img/pavbhaji.png'

  const images = {
  "Pizza" : pizzaImg,
  "Burger": burgerImg,
  "Cool Drinks": cocaImg,
  "Hot Drinks": hotDrinkImg,
  "Sandwichs": sandwichImg,
  "Snacks/Chaats": snacksImg,
  "Frankie Roll": iceCreamImg,
  "Noodles": noodlesImg,
  "Frankie Roll": frankieRollImg,
  "Hot Soups" : soupImg,
  "Starters": startersImg,
  "Fried Rice": friedRiceImg,
  "Pav Bhajis": pavBhajiImg,
  "Juice": juiceImg,
  "Milkshake": milkshakeImg,
  "Ice Cream": iceCreamImg
};

const img = ({
  catTitle,
  className
}) => {

    const Image = images[catTitle] 

  return (
    <div>
        <img src={Image} alt="" className={className}/>
    </div>
  )
}

export default img