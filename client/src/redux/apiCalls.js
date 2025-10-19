// import { loginFailure, loginStart, loginSuccess } from "./userRedux"
// import axios from "axios"

// export const login = async (dispatch, user) => {
//   dispatch(loginStart())
//   try {
//     const res = await axios.post("http://localhost:4000/api/auth/login", user)
//     dispatch(loginSuccess(res.data))
//   } catch (error) {
//     dispatch(loginFailure())
//   }
// }

// ...existing code...
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
// ...existing code...
