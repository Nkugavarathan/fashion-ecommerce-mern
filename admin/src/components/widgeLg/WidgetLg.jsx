import React, { useState, useEffect } from "react"
import { userRequest } from "../../requestMethod"
import "./widgetLg.css"

// export default function WidgetLg() {
//   const [orders, setOrders] = useState([])

//   useEffect(() => {
//     const getOrders = async () => {
//       try {
//         const res = await userRequest.get("/orders") // get all orders with username & image
//         setOrders(res.data)
//       } catch (err) {
//         console.error("Error fetching orders:", err)
//       }
//     }
//     getOrders()
//   }, [])
//   // console.log(orders)

//   const Button = ({ type }) => {
//     const capitalizedType =
//       type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
//     return (
//       <button className={"widgetLgButton " + capitalizedType}>
//         {capitalizedType}
//       </button>
//     )
//   }

//   // helper to format date
//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr)
//     return date.toLocaleDateString() + " " + date.toLocaleTimeString()
//   }

//   return (
//     <div className="widgetLg">
//       <h3 className="widgetLgTitle">Latest transactions</h3>
//       <table className="widgetLgTable">
//         <thead>
//           <tr className="widgetLgTr">
//             <th className="widgetLgTh">Customer</th>
//             <th className="widgetLgTh">Date</th>
//             <th className="widgetLgTh">Amount</th>
//             <th className="widgetLgTh">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr className="widgetLgTr" key={order._id}>
//               <td className="widgetLgUser">
//                 <img
//                   src={order.image || "https://via.placeholder.com/40"}
//                   alt={order.username || "User"}
//                   className="widgetLgImg"
//                 />
//                 <span className="widgetLgName">
//                   {order.username || "Unknown"}
//                 </span>
//               </td>
//               <td className="widgetLgDate">{formatDate(order.createdAt)}</td>
//               <td className="widgetLgAmount">${order.amount}</td>
//               <td className="widgetLgStatus">
//                 <Button type={order.status} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

export default function WidgetLg() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders")
        setOrders(res.data)
      } catch (err) {
        console.error("Error fetching orders:", err)
      }
    }
    getOrders()
  }, [])

  const Button = ({ type }) => {
    const capitalizedType =
      type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
    return (
      <button
        className={`px-2 py-1 rounded text-white text-xs ${
          type === "Approved"
            ? "bg-green-500"
            : type === "Pending"
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
      >
        {capitalizedType}
      </button>
    )
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  return (
    <div className="bg-white p-4 rounded shadow w-full overflow-x-auto ms-5">
      <h3 className="text-lg font-semibold mb-4">Latest Transactions</h3>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Customer</th>
            <th className="text-left p-2">Date</th>
            <th className="text-left p-2">Amount</th>
            <th className="text-left p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b">
              <td className="flex items-center gap-2 p-2">
                <img
                  src={order.image || "https://via.placeholder.com/40"}
                  alt={order.username || "User"}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>{order.username || "Unknown"}</span>
              </td>
              <td className="p-2">{formatDate(order.createdAt)}</td>
              <td className="p-2">${order.amount}</td>
              <td className="p-2">
                <Button type={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
