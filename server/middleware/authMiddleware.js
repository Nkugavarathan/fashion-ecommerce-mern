import jwt from "jsonwebtoken"
// import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

export const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1]
      console.log("🔹 Incoming token:", token)
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SEC)

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password")
      console.log("Secret used:", process.env.JWT_SEC)

      console.log("Decoded token:", decoded)

      if (!req.user) {
        console.log("❌ User not found in DB for ID:", decoded.id)
        return res.status(401).json({ message: "User not found" })
      }

      console.log("✅ Authenticated user:", req.user.username)
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error("Not authorized")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
}

// admin check
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(403).json({ message: "Not authorized as admin" })
  }
}
