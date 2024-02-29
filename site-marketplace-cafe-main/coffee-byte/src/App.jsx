import Header from "./layout/Header"
import Home from "./home/Home"
import Account from "./account/Account"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react";
import Register from "./account/Register";
import Login from "./account/Login";
import ProductInfo from "./home/ProductInfo";
import ProductRegister from "./account/ProductRegister";
import MyProductEdit from "./account/MyProductEdit";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/product-register" element={<ProductRegister/>}/>
        <Route path="/product-edit/:id" element={<MyProductEdit/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/product/:id" element={<ProductInfo/>}/>
      </Routes>
    </Router>
  )
}

export default App