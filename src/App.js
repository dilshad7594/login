import React from 'react';
import Home from './Component/Home';
import { Route,Routes } from 'react-router-dom';
import SignUpForm from './Component/Sign';
import Login from './Component/Login';
import Firstpage from './Component/Firstpage';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/signin" element={<SignUpForm/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Firstpage/>}/>
      </Routes>
    
    </div>
  )
}

export default App
