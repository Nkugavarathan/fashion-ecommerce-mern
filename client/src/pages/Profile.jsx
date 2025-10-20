import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { logout } from "../redux/userRedux"
import { userRequest } from "../requestMethod"
import axios from "axios"

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.user.currentUser)
  const token = useSelector((state) => state.user.token)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return
      setLoading(true)
      setError(null)
      try {
        let res
        if (userRequest) {
          res = await userRequest.get(`/orders/find/${currentUser._id}`)
        } else {
          res = await axios.get(
            `http://localhost:4000/api/orders/find/${currentUser._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
        }
        setOrders(res.data || [])
      } catch (err) {
        console.error("Fetch orders error:", err)
        setError(
          err.response?.data?.message || err.message || "Failed to load orders"
        )
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [currentUser, token])

  const handleLogout = () => {
    try {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    } catch (e) {}
    dispatch(logout())
    navigate("/login")
  }

  if (!currentUser) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Not signed in</h2>
        <p className="mb-4">
          Please{" "}
          <Link to="/login" className="text-teal-600">
            sign in
          </Link>{" "}
          to view your profile and orders.
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-6 mb-6">
        <img
          src={
            currentUser.image ||
            currentUser.profileImage ||
            "https://i.pravatar.cc/150?img=3"
          }
          alt={currentUser.username || "Avatar"}
          style={{
            width: 84,
            height: 84,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <div>
          <h1 style={{ margin: 0 }}>
            {currentUser.username || currentUser.name}
          </h1>
          <p style={{ margin: 0, color: "#666" }}>{currentUser.email}</p>
          <div style={{ marginTop: 8 }}>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <section className="mb-8">
        <h2 style={{ marginBottom: 10 }}>Order history</h2>

        {loading && <p>Loading orders...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && orders.length === 0 && <p>No orders found.</p>}

        <div className="space-y-4">
          {orders.map((order) => {
            const created = order.createdAt
              ? new Date(order.createdAt).toLocaleString()
              : ""
            const orderId = order._id || order.id
            const total =
              order.amount ?? order.total ?? order.price ?? order.cartTotal

            return (
              <div
                key={orderId}
                style={{
                  border: "1px solid #eee",
                  padding: 12,
                  borderRadius: 8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>
                      Order #{String(orderId).slice(-8)}
                    </div>
                    <div style={{ color: "#666", fontSize: 13 }}>{created}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 600 }}>
                      Total: ${Number(total || 0).toFixed(2)}
                    </div>
                    <div style={{ color: "#666", fontSize: 13 }}>
                      {order.status || "N/A"}
                    </div>
                  </div>
                </div>

                {/* products list (best-effort — backend shape varies) */}
                <div>
                  {order.products && order.products.length > 0 ? (
                    order.products.map((p, idx) => {
                      // product entry can be { productId, quantity, price } or nested differently
                      const title =
                        p.title ||
                        p.name ||
                        p.productName ||
                        (p.product && (p.product.title || p.product.name)) ||
                        `Product ${idx + 1}`
                      const qty =
                        p.quantity ??
                        p.qty ??
                        (p.product && p.product.quantity) ??
                        1
                      const price =
                        p.price ?? (p.product && p.product.price) ?? 0
                      return (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "6px 0",
                            borderTop: "1px solid #fafafa",
                          }}
                        >
                          <div style={{ color: "#333" }}>{title}</div>
                          <div style={{ color: "#666" }}>
                            x{qty} • ${Number(price).toFixed(2)}
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div style={{ color: "#666" }}>
                      Order details not available.
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
