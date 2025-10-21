import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import axios from "axios"
import { publicRequest, userRequest } from "../requestMethod"
import {
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
} from "./orderRedux"

// export const createOrder = async (orderData, dispatch) => {
//   dispatch(createOrderStart())
//   try {
//     const res = await userRequest.post("/orders", orderData)
//     dispatch(createOrderSuccess(res.data))
//   } catch (err) {
//     console.error("Order creation failed:", err)
//     dispatch(createOrderFailure())
//     throw err
//   }
// }

// export const createOrder = async (order, dispatch) => {
//   try {
//     const res = await userRequest.post("/orders", order)
//     dispatch({ type: "CREATE_ORDER_SUCCESS", payload: res.data })
//     return res.data // ✅ return created order
//   } catch (err) {
//     console.error("❌ createOrder error:", err)
//     throw err // ✅ propagate error to frontend
//   }
// }

export const createOrder = async (order, dispatch) => {
  try {
    console.log("📦 Sending order to backend:", order)
    const res = await userRequest.post("/orders", order)
    console.log("✅ Order created successfully:", res.data)

    // You can dispatch here if you plan to update Redux later
    // dispatch({ type: "CREATE_ORDER_SUCCESS", payload: res.data })

    return res.data // ✅ Return created order so CartCheckout gets it
  } catch (err) {
    console.error("❌ createOrder error:", err.response?.data || err.message)
    throw err // ✅ Pass error back to frontend
  }
}

export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const res = await publicRequest.post("/auth/login", user)
    dispatch(loginSuccess(res.data))
    return res.data
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Login failed"
    dispatch(loginFailure(message))
    throw error
  }
}

export const registerUser = async (userData) => {
  try {
    const res = await publicRequest.post("/auth/register", userData)
    return res.data // { user, token }
  } catch (error) {
    throw error
  }
}
