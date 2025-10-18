import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {
  const rootState = localStorage.getItem("persist:root")
  const userState = rootState ? JSON.parse(rootState).user : null
  const currentUser = userState ? JSON.parse(userState).currentUser : null
  const isAdmin = currentUser?.isAdmin

  return isAdmin ? children : <Navigate to="/login" />
}

export default ProtectedRoute
