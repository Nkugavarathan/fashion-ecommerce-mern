import React, { useState } from "react"
import { NotificationsNone, Language, Settings } from "@mui/icons-material"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import "./topbar.css"
import { Link } from "react-router-dom"
export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="w-full bg-white sticky top-0 z-[999] shadow-md">
      <div className="h-[50px] px-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/">
          <span className="font-bold text-[24px] sm:text-[28px] md:text-[30px] text-blue-900 cursor-pointer">
            Admin Dashboard
          </span>
        </Link>
        {/* Right section for desktop */}
        <div className="hidden sm:flex items-center gap-4">
          {/* <div className="relative cursor-pointer text-gray-600">
            <NotificationsNone />
            <span className="absolute -top-1 right-0 w-[15px] h-[15px] bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full">
              2
            </span>
          </div> */}

          {/* <div className="relative cursor-pointer text-gray-600">
            <Language />
            <span className="absolute -top-1 right-0 w-[15px] h-[15px] bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full">
              2
            </span>
          </div> */}

          <div className="relative cursor-pointer text-gray-600">
            <Settings />
          </div>

          <img
            src="https://tse4.mm.bing.net/th/id/OIP.Kk4i-k-7bOfsgPv0SJtj5AHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="admin-avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </div>
        {/* Hamburger for mobile */}
        <div className="sm:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white shadow-md border-t border-gray-200">
          <ul className="flex flex-col items-center py-2 space-y-2">
            <li className="flex items-center gap-2 text-gray-700">
              <NotificationsNone fontSize="small" /> Notifications
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <Language fontSize="small" /> Language
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <Settings fontSize="small" /> Settings
            </li>
            <li>
              <img
                src="https://tse4.mm.bing.net/th/id/OIP.Kk4i-k-7bOfsgPv0SJtj5AHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="admin-avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
