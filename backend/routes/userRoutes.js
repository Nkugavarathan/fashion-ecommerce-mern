import express from "express"
import { protect } from "./../middleware/authMiddleware.js"
import User from "../models/userModel.js"
import {
  getAllUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js"

const router = express.Router()

// get all users
router.get("/", getAllUser)
router.get("/:id", getUserById)

router.put("/:id", protect, updateUser)

export default router
