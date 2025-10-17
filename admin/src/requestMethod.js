import axios from "axios"

const BASE_URL = "http://localhost:4000/api"

const TOKEN = ""
//get products like
export const publicRequest = axios.create({
  baseURL: BASE_URL,
})

//login
export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
})
