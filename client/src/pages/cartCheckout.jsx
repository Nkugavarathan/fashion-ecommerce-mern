import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createOrder } from "../redux/apiCalls"
import axios from "axios"
import { clearCart } from "../redux/cartRedux"
export default function CartCheckout() {
  const cart = useSelector((state) => state.cart)
  const currentUser = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState(currentUser?.username || "")
  const [email, setEmail] = useState(currentUser?.email || "")
  const [address, setAddress] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [exp, setExp] = useState("")
  const [cvv, setCvv] = useState("")
  const [loading, setLoading] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  // const handlePay = async (e) => {
  //   e.preventDefault()
  //   if (!currentUser) {
  //     alert("Please login to place order")
  //     navigate("/login")
  //     return
  //   }

  //   if (!address || !cardNumber || !exp || !cvv) {
  //     alert("Please fill delivery and card details")
  //     return
  //   }

  //   if (isSubmitting) return // 🛑 prevent double click
  //   setIsSubmitting(true)
  //   setLoading(true)

  //   try {
  //     const orderPayload = {
  //       userId: currentUser._id,
  //       products: cart.products.map((p) => ({
  //         productId: p._id || p.id,
  //         quantity: p.quantity,
  //         price: p.price,
  //       })),
  //       amount: Number(cart.total || 0),
  //       address: { name, email, address },
  //       payment: {
  //         cardLast4: cardNumber.slice(-4),
  //         method: "card",
  //       },
  //     }

  //     console.log("🧾 Sending order:", orderPayload)
  //     const res = await createOrder(orderPayload, dispatch)

  //     if (res && res._id) {
  //       dispatch(clearCart())
  //       navigate(`/success?orderId=${res._id}`)
  //     } else {
  //       console.warn("Unexpected order response:", res)
  //       alert("Order placed, but no confirmation received.")
  //     }
  //   } catch (err) {
  //     console.error("❌ Order create failed:", err)
  //     alert("Order failed: " + (err.response?.data?.message || err.message))
  //   } finally {
  //     setIsSubmitting(false)
  //     setLoading(false)
  //   }
  // }
  const handlePay = async (e) => {
    e.preventDefault()

    if (!currentUser) {
      alert("Please login to place order")
      navigate("/login")
      return
    }

    if (!address || !cardNumber || !exp || !cvv) {
      alert("Please fill delivery and card details")
      return
    }

    setLoading(true)
    try {
      const orderPayload = {
        userId: currentUser._id,
        products: cart.products.map((p) => ({
          productId: p._id || p.id,
          quantity: p.quantity,
          price: p.price,
        })),
        amount: Number(cart.total) || 0,
        address: { name, email, address },
        payment: {
          cardLast4: cardNumber.slice(-4),
          method: "card",
        },
      }

      console.log("🧾 Sending order:", orderPayload)

      const res = await createOrder(orderPayload, dispatch) // ✅ Only call once

      console.log("✅ Order response:", res)

      dispatch(clearCart())
      navigate(`/success?orderId=${res._id}`)
    } catch (err) {
      console.error("Order create failed:", err)
      alert("Order failed: " + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Checkout</h2>

      <form onSubmit={handlePay} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Delivery address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <h3 className="font-medium">Payment</h3>
        <div>
          <label className="block text-sm">Card number</label>
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="4242 4242 4242 4242"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm">MM/YY</label>
            <input
              value={exp}
              onChange={(e) => setExp(e.target.value)}
              placeholder="12/25"
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div style={{ width: 120 }}>
            <label className="block text-sm">CVV</label>
            <input
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 text-white px-4 py-2 rounded"
          >
            {loading
              ? "Processing..."
              : `Pay Rs ${(cart.total || 0).toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  )
}
