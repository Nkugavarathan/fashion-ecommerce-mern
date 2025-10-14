import axios from "axios"

const BASE_URL = "http://localhost:4000/api"

// admin
// admin123
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZWVhOTIyYTlmMmZhNzUwMzkwNjA5OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc2MDQ3MTM5OCwiZXhwIjoxNzYzMDYzMzk4fQ.VQo-V6OLABKXvRMecPIzxjeonno4qBWb7adKh6hPE2s"
export const publicRequest = axios.create({
  baseURL: BASE_URL,
})

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
})
