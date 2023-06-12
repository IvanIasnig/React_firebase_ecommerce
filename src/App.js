import React from "react";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Account from './components/Account';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Firebase auth</h1>
    <Routes>
      <Route path='/' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/account' element={<Account/>}/>
    </Routes>
    </div>
  );
}

export default App;
