import axios from "axios"

const BASE_URL = "http://localhost:4000/api"


const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user || "{}")?.currentUser?.accessToken;
// const rootState = JSON.parse(localStorage.getItem("persist:root"))
// const userState = JSON.parse(rootState.user)
// const TOKEN = userState?.currentUser?.accessToken

//get products like
export const publicRequest = axios.create({
  baseURL: BASE_URL,
})

//login
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
})
