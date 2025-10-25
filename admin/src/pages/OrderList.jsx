import React, { useEffect, useState } from "react"
import axios from "axios"
import { DataGrid } from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Visibility } from "@mui/icons-material"
import { handleDownloadPDF } from "../jspdf.js"
import { userRequest } from "../requestMethod.js"
export default function OrderList() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const tokenFromRedux = useSelector((state) => state.user?.token)
  const token =
    tokenFromRedux ||
    (JSON.parse(localStorage.getItem("user") || "null")?.token ?? null)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const res = await userRequest.get("/orders")
        setOrders(res.data || [])
      } catch (err) {
        console.error("fetch orders error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [token])

  // Find the original order by ID
  const findOrderById = (orderId) => {
    return orders.find((order) => order._id === orderId)
  }

  const rows = orders.map((o) => {
    const userDisplay =
      o.userId && typeof o.userId === "object"
        ? o.userId.username || o.userId.email || o.userId._id
        : o.user || o.userId || "—"

    const productsList = (o.products || []).map((p) => {
      const title =
        p.title ||
        (p.productId &&
          typeof p.productId === "object" &&
          (p.productId.title || p.productId.name)) ||
        p.productId ||
        "Unknown Product"
      const qty = p.quantity ?? p.qty ?? 1
      return `${title} × ${qty}`
    })

    const address =
      (o.address &&
        (o.address.address ||
          o.address.line1 ||
          o.address.street ||
          JSON.stringify(o.address))) ||
      "—"

    const amount = "Rs " + Number(o.amount || 0)

    return {
      id: o._id,
      user: userDisplay,
      products: productsList.join(", "),
      address,
      amount,
      payment: o.payment?.cardLast4
        ? `****${o.payment.cardLast4}`
        : o.payment?.method || "—",
      status: o.status || "processing",
      createdAt: o.createdAt ? new Date(o.createdAt).toLocaleString() : "—",
    }
  })

  const columns = [
    { field: "id", headerName: "Order ID", width: 220 },
    { field: "user", headerName: "User", width: 150 },
    {
      field: "products",
      headerName: "Products (name × qty)",
      width: 380,
      renderCell: (params) => (
        <div style={{ whiteSpace: "normal", lineHeight: 1.2 }}>
          {params.value}
        </div>
      ),
    },
    { field: "address", headerName: "Address", width: 260 },
    {
      field: "amount",
      headerName: "Amount",
      width: 110,
    },
    { field: "payment", headerName: "Payment", width: 130 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "createdAt", headerName: "Created", width: 170 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const order = findOrderById(params.id)

        return (
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link to={`/orders/${params.id}`}>
              <Visibility style={{ cursor: "pointer", color: "#1976d2" }} />
            </Link>

            <button
              onClick={() => order && handleDownloadPDF(order)}
              disabled={!order}
              style={{
                background: order ? "#4CAF50" : "#cccccc",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: 6,
                display: "inline-flex",
                gap: 8,
                alignItems: "center",
                cursor: order ? "pointer" : "not-allowed",
                fontSize: "12px",
              }}
            >
              Download PDF
            </button>
          </div>
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
