import express from "express"
import { registerUser, loginUser } from "../middleware/userController.js"

const router = express.Router()

//Register

// register
router.post("/register", registerUser)

//login
router.post("/login", loginUser)

export default router
