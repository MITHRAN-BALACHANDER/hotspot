import React from "react"
import { BrowserRouter,Route,Routes } from "react-router-dom"
import Login from "./Login"
import Home from "./pages/Home"
import Aboutus from "./pages/Aboutus"
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/aboutus" element={<Aboutus/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
