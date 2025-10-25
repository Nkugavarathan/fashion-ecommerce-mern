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

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`

const ModalContent = styled.div`
  background: white;
  width: 90%;
  max-width: 600px;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  max-height: 80vh;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const Section = styled.div`
  margin: 12px 0;
`

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;

  img {
    width: 70px;
    height: 70px;
    border-radius: 8px;
    object-fit: cover;
  }
`

const CloseBtn = styled.button`
  margin-top: 16px;
  background: crimson;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: darkred;
  }
`

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.user.currentUser)
  const token = useSelector((state) => state.user.token)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!currentUser) return
    const fetchOrders = async () => {
      setLoading(true)
      setError(null)
      try {
        let res
        if (userRequest) {
          res = await userRequest.get(`/orders/find/${currentUser._id}`)
        }
        // } else {
        //   res = await axios.get(
        //     `http://localhost:4000/api/orders/find/${currentUser._id}`,
        //     { headers: { Authorization: `Bearer ${token}` } }
        //   )
        // }
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
  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "auto"
  }, [showModal])

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
                  currentUser.profileImage || "https://i.pravatar.cc/150?img=3"
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
                    {/* <Link
                      to={`/order/${orderId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Btn style={{ padding: "6px 10px" }}>View</Btn>
                    </Link> */}
                    <Btn
                      style={{ padding: "6px 10px" }}
                      onClick={() => {
                        setSelectedOrder(order)
                        setShowModal(true)
                      }}
                    >
                      View
                    </Btn>
                  </OrderRight>
                </OrderCard>
              )
            })}
          </OrdersList>
          {/* modal */}
          {showModal && selectedOrder && (
            <ModalOverlay onClick={() => setShowModal(false)}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <h3>Order Details</h3>
                <hr />

                <Section>
                  <h4>Products:</h4>
                  {selectedOrder.products?.map((p, i) => (
                    <ProductItem key={i}>
                      <img
                        src={
                          p.img || p.image || "https://via.placeholder.com/70"
                        }
                        alt={p.title}
                      />
                      <div>
                        <div>
                          <strong>{p.title || "Product"}</strong>
                        </div>
                        <Small>Quantity: {p.quantity}</Small>
                        <Small>Price: Rs {(p.price || 0).toFixed(2)}</Small>
                      </div>
                    </ProductItem>
                  ))}
                </Section>

                <Section>
                  <h4>Order Info:</h4>
                  <Small>
                    Date: {new Date(selectedOrder.createdAt).toLocaleString()}
                  </Small>
                  <Small>Status: {selectedOrder.status}</Small>
                  <Small>
                    Total: Rs {(selectedOrder.amount || 0).toFixed(2)}
                  </Small>
                </Section>

                {/*   inside selectedOrder.address object 
                address
                          Object
                          name
                          "varathan"
                          email
                          "kugavarathan28@gmail.com"
                          address
                          "No 18 yogapuram"

                          go to ordercollection
                
                */}
                <Section>
                  <h4>User Details:</h4>
                  <Small>Name: {selectedOrder.address?.name}</Small>
                  <Small>Email: {selectedOrder.address?.email}</Small>
                  <Small>
                    Address: {selectedOrder.address?.address || "N/A"}
                  </Small>
                </Section>

                <CloseBtn onClick={() => setShowModal(false)}>Close</CloseBtn>
              </ModalContent>
            </ModalOverlay>
          )}
        </Container>
      </Page>
    </>
  )
}
