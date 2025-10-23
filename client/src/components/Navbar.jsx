import React, { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout as logoutAction } from "../redux/userRedux"
import Badge from "@mui/material/Badge"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import SearchIcon from "@mui/icons-material/Search"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import axios from "axios"
import logo from "/images/logo.png"
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [acctOpen, setAcctOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const acctRef = useRef(null)

  const currentUser = useSelector((state) => state.user.currentUser)
  const quantity = useSelector((state) => state.cart.quantity)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (acctRef.current && !acctRef.current.contains(e.target)) {
        setAcctOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    dispatch(logoutAction())
    setAcctOpen(false)
    navigate("/")
  }

  const avatarSrc =
    currentUser?.image ||
    currentUser?.profileImage ||
    "https://i.pravatar.cc/150?img=3"

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all backdrop-blur-sm ${
        scrolled ? "bg-white/90 shadow-md" : "bg-gray-100/90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
          <span className="text-teal-600 font-bold text-3xl md:text-4xl me-16">
            VARA FASHION
          </span>
        </div>

        {/* Center: Search Bar */}
        {/* <div className="flex-1 mx-6 hidden md:flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-teal-400 me-16">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none w-full px-2 py-1 text-lg "
          />
          <SearchIcon className="text-gray-500" />
        </div> */}

        {/* Right: Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-lg font-medium">
          <Link
            className="text-teal-700 hover:text-teal-500 transition-colors duration-300"
            to="/"
          >
            Home
          </Link>

          {currentUser ? (
            <div className="relative" ref={acctRef}>
              <button
                onClick={() => setAcctOpen(!acctOpen)}
                className="focus:outline-none"
              >
                <img
                  src={avatarSrc}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                />
              </button>
              {acctOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg flex flex-col">
                  <button
                    onClick={() => navigate("/profile")}
                    className="text-teal-700 hover:text-teal-500 transition-colors duration-300"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-teal-700 hover:text-teal-500 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              className="text-teal-700 hover:text-teal-500 transition-colors duration-300"
              to="/login"
            >
              Login
            </Link>
          )}

          <Link to="/cart">
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlinedIcon className="text-teal-700" />
            </Badge>
          </Link>
        </div>

        {/* Mobile Hamburger + Search */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 focus-within:ring-2 focus-within:ring-teal-400">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none px-2 py-1 w-28 text-sm"
            />
            <SearchIcon className="text-gray-500" />
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            {menuOpen ? (
              <CloseIcon className="text-teal-600" />
            ) : (
              <MenuIcon className="text-teal-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md w-full">
          <div className="flex flex-col items-center px-6 py-4 space-y-3">
            <Link
              onClick={() => setMenuOpen(false)}
              className="text-teal-700 hover:text-teal-500 transition-colors duration-300"
              to="/"
            >
              Home
            </Link>

            {currentUser ? (
              <>
                <Link
                  onClick={() => setMenuOpen(false)}
                  className="text-teal-700 hover:text-teal-500 transition-colors duration-300"
                  to="/profile"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setMenuOpen(false)
                  }}
                  className="text-teal-700 hover:text-teal-500 transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                onClick={() => setMenuOpen(false)}
                className="text-teal-700 hover:text-teal-500 transition-colors duration-300"
                to="/login"
              >
                Login
              </Link>
            )}

            <Link onClick={() => setMenuOpen(false)} to="/cart">
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon className="text-teal-700" />
              </Badge>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
