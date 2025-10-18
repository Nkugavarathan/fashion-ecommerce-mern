import { userRequest } from "../requestMethod"
import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import axios from "axios"

export const login = async (dispatch, user) => {
  console.log("Login started...")
  dispatch(loginStart(user))
  try {
    const res = await userRequest.post("/auth/login", user)
    console.log("Login success:", res.data)
    dispatch(loginSuccess(res.data))
  } catch (error) {
    console.error("Login failed:", error)
    dispatch(loginFailure())
  }
}
