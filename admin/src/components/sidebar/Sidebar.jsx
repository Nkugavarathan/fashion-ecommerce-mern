import React from "react"
import "./sidebar.css"
import {
  LineStyle,
  PermIdentity,
  Storefront,
  ListAlt,
} from "@mui/icons-material"
import { Link } from "react-router-dom"
function Sidebar() {
  return (
    <div className="sidebar ">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <li className="sidebarListItem ">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link
              to="/users"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link
              to="/orders"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="sidebarListItem">
                <ListAlt className="sidebarIcon" />
                Orders
              </li>
            </Link>
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div> */}
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  )
}

export default Sidebar
