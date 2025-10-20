import express from "express"
import { admin, protect } from "./../middleware/authMiddleware.js"
import { upload } from "../middleware/uploadMiddleware.js"

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

// Update profile (auth required and user must be same or admin)
router.put("/:id", protect, upload.single("image"), updateUser)

router.delete("/:id", protect, admin, deleteUser)
export default router
