import React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Topbar from "./components/topbar/Topbar"
import Sidebar from "./components/sidebar/Sidebar"
import "./App.css"
import Home from "./pages/Home/Home"
import UserList from "./pages/userList/UserList"
import User from "./pages/user/User"
import NewUser from "./pages/newuser/NewUser"
import Product from "./pages/product/Product"
import ProductList from "./pages/productlist/ProductList"
import NewProduct from "./pages/newproduct/NewProduct"
import Login from "./pages/Login"
import OrderList from "./pages/OrderList"
import OrderDetail from "./pages/OrderDetail"

function App() {
  const location = useLocation()
  const isLoginPage = location.pathname === "/login"

  return (
    <>
      <Topbar />
      <div className="container">
        {!isLoginPage && <Sidebar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
        </Routes>
      </div>
    </>
  )
}

export default App
