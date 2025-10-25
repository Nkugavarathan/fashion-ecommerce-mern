import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import { useParams, Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { ArrowBack } from "@mui/icons-material"
import { Print } from "@mui/icons-material"
import { handleDownloadPDF } from "../jspdf"

import { userRequest } from "../requestMethod"
export default function OrderDetail() {
  const { id } = useParams()
  // const location = useLocation()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const token =
    useSelector((state) => state.user?.token) ||
    JSON.parse(localStorage.getItem("user") || "null")?.token

  // const printRef = useRef(null)

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await userRequest.get(`/orders/${id}`)

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

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>
  if (error)
    return <div style={{ padding: 16, color: "crimson" }}>Error: {error}</div>
  if (!order) return <div style={{ padding: 16 }}>Order not found</div>

  return (
    <div className="p-5 flex-[4]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-[#1976d2] no-underline"
        >
          <ArrowBack /> Back to Orders
        </Link>

        <div className="flex gap-2">
          <button
            onClick={() => handleDownloadPDF(order)}
            className="bg-[#1976d2] text-white border-none px-3 py-2 rounded-md inline-flex gap-2 items-center cursor-pointer"
          >
            <Print /> Print
          </button>
        </div>
      </div>

      <h2 className="mt-3">Order #{String(order._id).slice(-8)}</h2>

      {/* Printable area */}
      <div className="mt-3">
        <div className="grid gap-5 md:grid-cols-[1fr_320px]">
          {/* Products */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="mt-0">Products</h3>
            {order.products && order.products.length ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((p, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-dashed border-gray-100"
                    >
                      <td className="py-2">
                        {p.title || p.name || p.productId || "Product"}
                      </td>
                      <td className="py-2">{p.quantity ?? p.qty ?? 1}</td>
                      <td className="py-2">
                        Rs {Number(p.price ?? 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No product details</div>
            )}
          </div>

          {/* Summary */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="mt-0">Summary</h3>
            <div className="mb-2">
              <strong>Order ID:</strong> {order._id}
            </div>
            <div className="mb-2">
              <strong>User:</strong>{" "}
              {order.userId?.username
                ? `${order.userId.username} (${order.userId.email})`
                : order.userId || "—"}
            </div>
            <div className="mb-2">
              <strong>Placed:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <div className="mb-2">
              <strong>Amount:</strong> Rs {Number(order.amount ?? 0).toFixed(2)}
            </div>
            <div className="mb-2">
              <strong>Payment:</strong>{" "}
              {order.payment?.cardLast4
                ? `****${order.payment.cardLast4}`
                : order.payment?.method || "—"}
            </div>
            <div className="mb-2">
              <strong>Status:</strong> {order.status}
            </div>

            <h4 className="mt-3">Delivery Address</h4>
            <div className="text-sm text-gray-700">
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
