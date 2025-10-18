import React, { useState, useEffect } from "react"
import { userRequest } from "../../requestMethod"
import "./widgetLg.css"

export default function WidgetLg() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders") // get all orders with username & image
        setOrders(res.data)
      } catch (err) {
        console.error("Error fetching orders:", err)
      }
    }
    getOrders()
  }, [])
  console.log(orders)

  const Button = ({ type }) => {
    const capitalizedType =
      type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
    return (
      <button className={"widgetLgButton " + capitalizedType}>
        {capitalizedType}
      </button>
    )
  }

  // helper to format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                <img
                  src={order.image || "https://via.placeholder.com/40"}
                  alt={order.username || "User"}
                  className="widgetLgImg"
                />
                <span className="widgetLgName">
                  {order.username || "Unknown"}
                </span>
              </td>
              <td className="widgetLgDate">{formatDate(order.createdAt)}</td>
              <td className="widgetLgAmount">${order.amount}</td>
              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
