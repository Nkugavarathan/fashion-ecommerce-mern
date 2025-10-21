// import React, { useEffect, useState } from "react"
// import { useSelector, useDispatch } from "react-redux"
// import { useNavigate, Link } from "react-router-dom"
// import { logout } from "../redux/userRedux"
// import { userRequest } from "../requestMethod"
// import axios from "axios"

// export default function Profile() {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const currentUser = useSelector((state) => state.user.currentUser)
//   const token = useSelector((state) => state.user.token)
//   const [orders, setOrders] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!currentUser) return
//       setLoading(true)
//       setError(null)
//       try {
//         let res
//         if (userRequest) {
//           res = await userRequest.get(`/orders/find/${currentUser._id}`)
//         } else {
//           res = await axios.get(
//             `http://localhost:4000/api/orders/find/${currentUser._id}`,
//             { headers: { Authorization: `Bearer ${token}` } }
//           )
//         }
//         setOrders(res.data || [])
//       } catch (err) {
//         console.error("Fetch orders error:", err)
//         setError(
//           err.response?.data?.message || err.message || "Failed to load orders"
//         )
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchOrders()
//   }, [currentUser, token])

//   const handleLogout = () => {
//     try {
//       localStorage.removeItem("token")
//       localStorage.removeItem("user")
//     } catch (e) {}
//     dispatch(logout())
//     navigate("/login")
//   }

//   if (!currentUser) {
//     return (
//       <div className="p-6 max-w-3xl mx-auto">
//         <h2 className="text-xl font-semibold mb-4">Not signed in</h2>
//         <p className="mb-4">
//           Please{" "}
//           <Link to="/login" className="text-teal-600">
//             sign in
//           </Link>{" "}
//           to view your profile and orders.
//         </p>
//       </div>
//     )
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <div className="flex items-center gap-6 mb-6">
//         <img
//           src={
//             currentUser.image ||
//             currentUser.profileImage ||
//             "https://i.pravatar.cc/150?img=3"
//           }
//           alt={currentUser.username || "Avatar"}
//           style={{
//             width: 84,
//             height: 84,
//             borderRadius: "50%",
//             objectFit: "cover",
//           }}
//         />
//         <div>
//           <h1 style={{ margin: 0 }}>
//             {currentUser.username || currentUser.name}
//           </h1>
//           <p style={{ margin: 0, color: "#666" }}>{currentUser.email}</p>
//           <div style={{ marginTop: 8 }}>
//             <button
//               onClick={handleLogout}
//               className="px-3 py-1 rounded border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       <section className="mb-8">
//         <h2 style={{ marginBottom: 10 }}>Order history</h2>

//         {loading && <p>Loading orders...</p>}
//         {error && <p style={{ color: "red" }}>{error}</p>}

//         {!loading && orders.length === 0 && <p>No orders found.</p>}

//         <div className="space-y-4">
//           {orders.map((order) => {
//             const created = order.createdAt
//               ? new Date(order.createdAt).toLocaleString()
//               : ""
//             const orderId = order._id || order.id
//             const  =
//               order.amount ?? order.total ?? order.price ?? order.cartTotal

//             return (
//               <div
//                 key={orderId}
//                 style={{
//                   border: "1px solid #eee",
//                   padding: 12,
//                   borderRadius: 8,
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginBottom: 8,
//                   }}
//                 >
//                   <div>
//                     <div style={{ fontWeight: 600 }}>
//                       Order #{String(orderId).slice(-8)}
//                     </div>
//                     <div style={{ color: "#666", fontSize: 13 }}>{created}</div>
//                   </div>
//                   <div style={{ textAlign: "right" }}>
//                     <div style={{ fontWeight: 600 }}>
//                       Total: ${Number(total || 0).toFixed(2)}
//                     </div>
//                     <div style={{ color: "#666", fontSize: 13 }}>
//                       {order.status || "N/A"}
//                     </div>
//                   </div>
//                 </div>

//                 {/* products list (best-effort — backend shape varies) */}
//                 <div>
//                   {order.products && order.products.length > 0 ? (
//                     order.products.map((p, idx) => {
//                       // product entry can be { productId, quantity, price } or nested differently
//                       const title =
//                         p.title ||
//                         p.name ||
//                         p.productName ||
//                         (p.product && (p.product.title || p.product.name)) ||
//                         `Product ${idx + 1}`
//                       const qty =
//                         p.quantity ??
//                         p.qty ??
//                         (p.product && p.product.quantity) ??
//                         1
//                       const price =
//                         p.price ?? (p.product && p.product.price) ?? 0
//                       return (
//                         <div
//                           key={idx}
//                           style={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             padding: "6px 0",
//                             borderTop: "1px solid #fafafa",
//                           }}
//                         >
//                           <div style={{ color: "#333" }}>{title}</div>
//                           <div style={{ color: "#666" }}>
//                             x{qty} • ${Number(price).toFixed(2)}
//                           </div>
//                         </div>
//                       )
//                     })
//                   ) : (
//                     <div style={{ color: "#666" }}>
//                       Order details not available.
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       </section>
//     </div>
//   )
// }

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import styled from "styled-components"
import Navbar from "../components/Navbar"
import { logout } from "../redux/userRedux"
import { userRequest } from "../requestMethod"
import axios from "axios"

const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #f7fbfb 0%, #ffffff 40%);
  padding-top: 88px; /* leave space for navbar */
`

const Container = styled.div`
  max-width: 1100px;
  margin: 28px auto;
  padding: 28px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(12, 24, 40, 0.06);
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
`

const LeftInfo = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

const Avatar = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e6f7f6;
  background: #f0f7f6;
`

const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Name = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #0f1724;
`

const Email = styled.p`
  margin: 0;
  color: #586069;
  font-size: 14px;
`

const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const Btn = styled.button`
  background: ${(p) => (p.primary ? "#0ea5a4" : "transparent")};
  color: ${(p) => (p.primary ? "#fff" : "#0f1724")};
  border: ${(p) => (p.primary ? "none" : "1px solid #e6eef0")};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(14, 165, 164, 0.12);
  }
`

const SectionTitle = styled.h3`
  margin: 18px 0 10px;
  font-size: 16px;
  color: #0f1724;
`

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const OrderCard = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #f0f4f4;
  background: linear-gradient(180deg, #ffffff 0%, #fbffff 100%);
`

const OrderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const OrderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  min-width: 160px;
  text-align: right;
`

const Small = styled.div`
  font-size: 13px;
  color: #5b6b6b;
`

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.user.currentUser)
  const token = useSelector((state) => state.user.token)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!currentUser) return
    const fetchOrders = async () => {
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
      <>
        <Navbar />
        <Page>
          <Container>
            <h2>Not signed in</h2>
            <p>
              Please <Link to="/login">sign in</Link> to view your profile and
              orders.
            </p>
            <div style={{ marginTop: 12 }}>
              <Link to="/">
                <Btn>Back to Home</Btn>
              </Link>
            </div>
          </Container>
        </Page>
      </>
    )
  }

  // react return
  return (
    <>
      <Navbar />
      <Page>
        <Container>
          <Header>
            <LeftInfo>
              <Avatar
                src={
                  currentUser.image ||
                  currentUser.profileImage ||
                  "https://i.pravatar.cc/150?img=3"
                }
                alt={currentUser.username || "Avatar"}
              />
              <UserMeta>
                <Name>{currentUser.username || currentUser.name}</Name>
                <Email>{currentUser.email}</Email>
                <Small>
                  Member since:{" "}
                  {new Date(currentUser.createdAt).toLocaleDateString()}
                </Small>
              </UserMeta>
            </LeftInfo>

            <ActionRow>
              <Link to="/">
                <Btn aria-label="Back to home">Back to Home</Btn>
              </Link>
              <Btn onClick={() => navigate("/profile/edit")}>Edit Profile</Btn>
              <Btn primary onClick={handleLogout}>
                Logout
              </Btn>
            </ActionRow>
          </Header>

          <SectionTitle>Order history</SectionTitle>

          {loading && <Small>Loading orders...</Small>}
          {error && <Small style={{ color: "crimson" }}>{error}</Small>}
          {!loading && orders.length === 0 && <Small>No orders found.</Small>}

          <OrdersList>
            {orders.map((order) => {
              const created = order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : ""
              const orderId = order._id || order.id
              const total = order.amount ?? order.total ?? 0
              return (
                <OrderCard key={orderId}>
                  <OrderLeft>
                    <div style={{ fontWeight: 700 }}>
                      Order #{String(orderId).slice(-8)}
                    </div>
                    <Small>{created}</Small>
                    <Small>
                      Items: {(order.products && order.products.length) || 0}
                    </Small>
                  </OrderLeft>
                  <OrderRight>
                    <div style={{ fontWeight: 700 }}>
                      Rs {Number(total).toFixed(2)}
                    </div>
                    <Small>Status: {order.status || "processing"}</Small>
                    <Link
                      to={`/order/${orderId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Btn style={{ padding: "6px 10px" }}>View</Btn>
                    </Link>
                  </OrderRight>
                </OrderCard>
              )
            })}
          </OrdersList>
        </Container>
      </Page>
    </>
  )
}
