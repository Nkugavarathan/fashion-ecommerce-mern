import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import axios from "axios"
import { publicRequest } from "../requestMethod"

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

// Create order (no Stripe). order = { userId, products, amount, address, paymentInfo }
export const createOrder = async (order, dispatch) => {
  try {
    // prefer authenticated request
    const res = await userRequest.post("/orders", order)
    return res.data
  } catch (err) {
    console.error("createOrder error:", err.response?.data || err.message)
    throw err
  }
}
