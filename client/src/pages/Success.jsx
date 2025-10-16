import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { userRequest } from "../requestMethods"

const Success = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const data = location?.state?.stripeData
  const cart = location?.state?.cart
  const currentUser = useSelector((state) => state.user.currentUser)
  const [orderId, setOrderId] = useState(null)

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity, // ✅ fixed key name
          })),
          amount: cart.total,
          address: data.billing_details.address,
        })
        setOrderId(res.data._id)
      } catch (err) {
        console.log(err)
      }
    }

    if (data && cart && currentUser) {
      createOrder()
    }
  }, [cart, data, currentUser])

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `🎉 Order has been created successfully! Your order number is ${orderId}.`
        : `✅ Payment successful! Your order is being prepared...`}

      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          marginTop: 20,
          border: "none",
          backgroundColor: "teal",
          color: "white",
          borderRadius: 5,
          cursor: "pointer",
        }}
      >
        Go to Homepage
      </button>
    </div>
  )
}

export default Success
