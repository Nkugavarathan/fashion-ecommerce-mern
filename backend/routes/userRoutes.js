import express from "express"
import { admin, protect } from "./../middleware/authMiddleware.js"

import {
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
  getUserStats,
} from "../controllers/userController.js"

const router = express.Router()

// get all users
router.get("/", protect, admin, getAllUser)
router.get("/:id", getUserById)
router.get("/stats", getUserStats)
router.put("/:id", protect, admin, updateUser)

router.delete("/:id", protect, admin, deleteUser)
export default router
