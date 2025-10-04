import express from "express"
import { admin, protect } from "./../middleware/authMiddleware.js"

import {
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js"

const router = express.Router()

// get all users
router.get("/", getAllUser)
router.get("/:id", getUserById)

router.put("/:id", protect, updateUser)

router.delete("/:id", protect, admin, deleteUser)
export default router
