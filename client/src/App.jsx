import React from "react"
import Home from "./pages/Home"
import ProductList from "./pages/ProductList"
import SingleProduct from "./pages/SingleProduct"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import { Routes, Route, Navigate } from "react-router-dom"
function App() {
  const user = true
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<SingleProduct />} />

        <Route path="/cart" element={<Cart />} />

        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />
      </Routes>
    </div>
  )
}

export default App
