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

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  // you can add timeout etc here
})

export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const res = await API.post("/auth/login", user)
    // res.data is { user, token }
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
    const res = await API.post("/auth/register", userData)
    return res.data // { user, token }
  } catch (error) {
    throw error
  }
}
// ...existing code...
