// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import { useParams, Link } from "react-router-dom"
// import { useSelector } from "react-redux"
// import { ArrowBack } from "@mui/icons-material"

// export default function OrderDetail() {
//   const { id } = useParams()
//   const [order, setOrder] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const token =
//     useSelector((state) => state.user?.token) ||
//     JSON.parse(localStorage.getItem("user") || "null")?.token

//   useEffect(() => {
//     const fetchOrder = async () => {
//       setLoading(true)
//       setError(null)
//       try {
//         const res = await axios.get(`http://localhost:4000/api/orders/${id}`, {
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//         })
//         setOrder(res.data)
//       } catch (err) {
//         console.error("fetch order error:", err)
//         setError(err.response?.data?.message || err.message)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchOrder()
//   }, [id, token])

//   if (loading) return <div style={{ padding: 16 }}>Loading...</div>
//   if (error)
//     return <div style={{ padding: 16, color: "crimson" }}>Error: {error}</div>
//   if (!order) return <div style={{ padding: 16 }}>Order not found</div>

//   return (
//     <div style={{ padding: 20, flex: 4 }}>
//       <Link
//         to="/orders"
//         style={{
//           display: "inline-flex",
//           alignItems: "center",
//           gap: 8,
//           textDecoration: "none",
//           color: "#1976d2",
//         }}
//       >
//         <ArrowBack /> Back to Orders
//       </Link>

//       <h2 style={{ marginTop: 12 }}>Order #{String(order._id).slice(-8)}</h2>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 320px",
//           gap: 20,
//           marginTop: 12,
//         }}
//       >
//         <div
//           style={{
//             background: "#fff",
//             padding: 16,
//             borderRadius: 8,
//             boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
//           }}
//         >
//           <h3 style={{ marginTop: 0 }}>Products</h3>
//           {order.products && order.products.length ? (
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr
//                   style={{ textAlign: "left", borderBottom: "1px solid #eee" }}
//                 >
//                   <th>Product</th>
//                   <th>Qty</th>
//                   <th>Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {order.products.map((p, idx) => (
//                   <tr key={idx} style={{ borderBottom: "1px dashed #f1f1f1" }}>
//                     <td style={{ padding: "8px 0" }}>
//                       {p.title || p.name || p.productId || "Product"}
//                     </td>
//                     <td style={{ padding: "8px 0" }}>
//                       {p.quantity ?? p.qty ?? 1}
//                     </td>
//                     <td style={{ padding: "8px 0" }}>
//                       $
//                       {(p.price ?? 0).toFixed
//                         ? (p.price ?? 0).toFixed(2)
//                         : p.price}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <div>No product details</div>
//           )}
//         </div>

//         <div
//           style={{
//             background: "#fff",
//             padding: 16,
//             borderRadius: 8,
//             boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
//           }}
//         >
//           <h3 style={{ marginTop: 0 }}>Summary</h3>
//           <div style={{ marginBottom: 8 }}>
//             <strong>Order ID:</strong> {order._id}
//           </div>
//           <div style={{ marginBottom: 8 }}>
//             <strong>User:</strong> {order.user || order.userId}
//           </div>
//           <div style={{ marginBottom: 8 }}>
//             <strong>Placed:</strong>{" "}
//             {new Date(order.createdAt).toLocaleString()}
//           </div>
//           <div style={{ marginBottom: 8 }}>
//             <strong>Amount:</strong> ${Number(order.amount ?? 0).toFixed(2)}
//           </div>
//           <div style={{ marginBottom: 8 }}>
//             <strong>Payment:</strong>{" "}
//             {order.payment?.cardLast4
//               ? `****${order.payment.cardLast4}`
//               : order.payment?.method || "—"}
//           </div>
//           <div style={{ marginBottom: 8 }}>
//             <strong>Status:</strong> {order.status}
//           </div>

//           <h4 style={{ marginTop: 12 }}>Delivery Address</h4>
//           <div style={{ fontSize: 14, color: "#444" }}>
//             {order.address ? (
//               <>
//                 <div>{order.address.name || ""}</div>
//                 <div>{order.address.address || order.address.line1 || ""}</div>
//                 <div>
//                   {order.address.city || ""} {order.address.postalCode || ""}
//                 </div>
//                 <div>{order.address.email || ""}</div>
//               </>
//             ) : (
//               <div>No address provided</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import { useParams, Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { ArrowBack } from "@mui/icons-material"
import { Print } from "@mui/icons-material"

export default function OrderDetail() {
  const { id } = useParams()
  const location = useLocation()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const token =
    useSelector((state) => state.user?.token) ||
    JSON.parse(localStorage.getItem("user") || "null")?.token

  const printRef = useRef(null)

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get(`http://localhost:4000/api/orders/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        setOrder(res.data)
      } catch (err) {
        console.error("fetch order error:", err)
        setError(err.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id, token])

  // If query contains print=true, trigger print automatically once order loaded
  useEffect(() => {
    if (!order) return
    const params = new URLSearchParams(location.search)
    if (params.get("print") === "true") {
      // give the page a moment to render styles
      setTimeout(() => {
        // open print for current window/tab
        window.print()
      }, 400)
    }
  }, [order, location.search])

  const handleManualPrint = () => {
    // open a new window/tab to the same route with print flag to trigger auto-print
    const url = `${window.location.origin}/orders/${id}?print=true`
    window.open(url, "_blank")
  }

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>
  if (error)
    return <div style={{ padding: 16, color: "crimson" }}>Error: {error}</div>
  if (!order) return <div style={{ padding: 16 }}>Order not found</div>

  return (
    <div style={{ padding: 20, flex: 4 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/orders"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            color: "#1976d2",
          }}
        >
          <ArrowBack /> Back to Orders
        </Link>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={handleManualPrint}
            style={{
              background: "#1976d2",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: 6,
              display: "inline-flex",
              gap: 8,
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Print /> Print
          </button>
        </div>
      </div>

      <h2 style={{ marginTop: 12 }}>Order #{String(order._id).slice(-8)}</h2>

      {/* Printable area */}
      <div ref={printRef}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 20,
            marginTop: 12,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 16,
              borderRadius: 8,
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Products</h3>
            {order.products && order.products.length ? (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      textAlign: "left",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((p, idx) => (
                    <tr
                      key={idx}
                      style={{ borderBottom: "1px dashed #f1f1f1" }}
                    >
                      <td style={{ padding: "8px 0" }}>
                        {p.title || p.name || p.productId || "Product"}
                      </td>
                      <td style={{ padding: "8px 0" }}>
                        {p.quantity ?? p.qty ?? 1}
                      </td>
                      <td style={{ padding: "8px 0" }}>
                        ${Number(p.price ?? 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No product details</div>
            )}
          </div>

          <div
            style={{
              background: "#fff",
              padding: 16,
              borderRadius: 8,
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Summary</h3>
            <div style={{ marginBottom: 8 }}>
              <strong>Order ID:</strong> {order._id}
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>User:</strong> {order.user || order.userId}
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Placed:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Amount:</strong> ${Number(order.amount ?? 0).toFixed(2)}
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Payment:</strong>{" "}
              {order.payment?.cardLast4
                ? `****${order.payment.cardLast4}`
                : order.payment?.method || "—"}
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Status:</strong> {order.status}
            </div>

            <h4 style={{ marginTop: 12 }}>Delivery Address</h4>
            <div style={{ fontSize: 14, color: "#444" }}>
              {order.address ? (
                <>
                  <div>{order.address.name || ""}</div>
                  <div>
                    {order.address.address || order.address.line1 || ""}
                  </div>
                  <div>
                    {order.address.city || ""} {order.address.postalCode || ""}
                  </div>
                  <div>{order.address.email || ""}</div>
                </>
              ) : (
                <div>No address provided</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
// ...existing code...
