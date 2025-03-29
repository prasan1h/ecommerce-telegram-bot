import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import './assets/style.css'

import Button from './components/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        hello world
        <Button title={"ADD"} disable={false} type={'add'}/>
        <Button title={"REMOVE"} disable={false} type={'remove'}/>
        <Button title={"CHECKOUT"} disable={false} type={'checkout'}/>
      </div>
    </>
  )
}

export default App
