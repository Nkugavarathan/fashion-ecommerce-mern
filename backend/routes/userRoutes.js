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

router.get("/stats", getUserStats)

// get all users
router.get("/", getAllUser)

router.get("/find/:id", getUserById)

router.put("/:id", protect, admin, updateUser)

router.delete("/:id", protect, admin, deleteUser)
export default router
