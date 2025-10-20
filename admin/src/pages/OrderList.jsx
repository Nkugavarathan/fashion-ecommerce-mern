import React, { useEffect, useState } from "react"
import axios from "axios"
import { DataGrid } from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { Visibility } from "@mui/icons-material"
import { userRequest } from "../requestMethod"

export default function OrderList() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  // try to read token from redux or localStorage
  const tokenFromRedux = useSelector((state) => state.user?.token)
  const token =
    tokenFromRedux || JSON.parse(localStorage.getItem("user") || "null")?.token

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const res = await userRequest.get("/orders")
        console.log("fetching orider " + res.data)
        setOrders(res.data || [])
      } catch (err) {
        console.error("fetch orders error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [token])

  // map orders to data grid rows
  const rows = orders.map((o) => ({
    id: o._id,
    user: (o.user && (o.user.username || o.user.email)) || o.userId || "—",
    products:
      (o.products || [])
        .map(
          (p) =>
            `${p.title || p.name || p.productId || "Product"} x${
              p.quantity || p.qty || 1
            }`
        )
        .join(", ") || "—",
    address:
      o.address && (o.address.address || o.address.line1 || o.address.street)
        ? `${o.address.address || o.address.line1 || o.address.street}, ${
            o.address.city || ""
          } ${o.address.postalCode || ""}`
        : JSON.stringify(o.address || {}),
    amount: o.amount ?? 0,
    payment: o.payment?.cardLast4
      ? `****${o.payment.cardLast4}`
      : o.payment?.method || "—",
    status: o.status || "processing",
    createdAt: o.createdAt ? new Date(o.createdAt).toLocaleString() : "—",
  }))

  const columns = [
    { field: "id", headerName: "Order ID", width: 220 },
    { field: "user", headerName: "User", width: 150 },
    { field: "products", headerName: "Products (name × qty)", width: 350 },
    { field: "address", headerName: "Address", width: 280 },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
      valueFormatter: ({ value }) => `$${Number(value).toFixed(2)}`,
    },
    { field: "payment", headerName: "Payment", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "createdAt", headerName: "Created", width: 170 },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Link to={`/orders/${params.id}`} style={{ textDecoration: "none" }}>
            <Visibility style={{ cursor: "pointer", color: "#1976d2" }} />
          </Link>
        )
      },
    },
  ]

  return (
    <div style={{ height: 640, width: "100%", padding: 16 }}>
      <h2 style={{ marginBottom: 12 }}>Orders</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        loading={loading}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  )
}
