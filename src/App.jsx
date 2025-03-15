/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
*/
import Landing from "./landing"
import Location from "./location"
function App() {
  //const [count, setCount] = useState(5)
 //  let count =0;
  /*const setCount = (value) => {
    count = value;
  }
*/
  return (
    
      <div>
        <h1>Login</h1>
        <Landing/>
       <Location/>
      </div>
      
  
  )
}

export default App
