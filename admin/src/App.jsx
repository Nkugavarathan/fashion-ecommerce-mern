import React from "react"
import { Routes, Route } from "react-router-dom"
import Topbar from "./components/topbar/Topbar"
import Sidebar from "./components/sidebar/Sidebar"
import "./App.css"
import Home from "./pages/Home/Home"
import UserList from "./pages/userList/Userlist"
import User from "./pages/user/User"
import NewUser from "./pages/newuser/NewUser"
import Product from "./pages/product/Product"
import ProductList from "./pages/productlist/ProductList"
function App() {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:productId" element={<Product />} />
        </Routes>
      </div>
    </>
  )
}

export default App
