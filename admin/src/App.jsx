// import React from "react"
// import { Routes, Route, useLocation } from "react-router-dom"
// import Topbar from "./components/topbar/Topbar"
// import Sidebar from "./components/sidebar/Sidebar"
// import "./App.css"
// import Home from "./pages/Home/Home"
// import UserList from "./pages/userList/Userlist"
// import User from "./pages/user/User"
// import NewUser from "./pages/newuser/NewUser"
// import Product from "./pages/product/Product"
// import ProductList from "./pages/productlist/ProductList"
// import NewProduct from "./pages/newproduct/NewProduct"
// import Login from "./pages/Login"

// function App() {
//   const rootState = localStorage.getItem("persist:root")
//   const userState = rootState ? JSON.parse(rootState).user : null
//   const currentUser = userState ? JSON.parse(userState).currentUser : null
//   const isAdmin = currentUser?.isAdmin

//   return (
//     <>
//       {/* Always show login page if not admin */}
//       {!isAdmin && <Login />}

//       {/* Dashboard for admin */}
//       {isAdmin && (
//         <>
//           <Topbar />
//           <div className="container">
//             <Sidebar />
//             <Routes>
//               <Route path="/admin-dashboard" element={<Home />} />
//               <Route path="/users" element={<UserList />} />
//               <Route path="/users/:userId" element={<User />} />
//               <Route path="/newUser" element={<NewUser />} />
//               <Route path="/products" element={<ProductList />} />
//               <Route path="/products/:productId" element={<Product />} />
//               <Route path="/newproduct" element={<NewProduct />} />
//               {/* Optional: keep /login route to redirect back */}
//               <Route path="/login" element={<Login />} />
//             </Routes>
//           </div>
//         </>
//       )}
//     </>
//   )
// }

// export default App

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
import Register from "./pages/Register"

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
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  )
}

export default App
