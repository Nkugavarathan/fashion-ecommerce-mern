import React from "react"
import Topbar from "./components/topbar/Topbar"
import Sidebar from "./components/sidebar/Sidebar"
import "./App.css"
import Home from "./pages/Home/Home"
function App() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Home />
      </div>
    </div>
  )
}

export default App
