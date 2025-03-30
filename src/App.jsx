import { useState } from "react";

import "./App.css";
import "./assets/style.css";

import Button from "./components/button";
import Card from "./components/card";

import { getData } from './db/db'; 

const foods = getData();

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        hello world
        <Button title={"ADD"} disable={false} type={"add"} />
        <Button title={"REMOVE"} disable={false} type={"remove"} />
        <Button title={"CHECKOUT"} disable={false} type={"checkout"} />
        {foods.map((food) => (
          <Card key={food.id} food={food} />
        ))}
      </div>
    </>
  );
}

export default App;
