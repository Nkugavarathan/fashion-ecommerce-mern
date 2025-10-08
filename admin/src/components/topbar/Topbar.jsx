import React from "react"
import "./topbar.css"
import { NotificationsNone, Language, Settings } from "@mui/icons-material"

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://tse4.mm.bing.net/th/id/OIP.Kk4i-k-7bOfsgPv0SJtj5AHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  )
}
