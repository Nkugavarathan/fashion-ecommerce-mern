import express from "express"
import {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getUserOrders,
} from "./../controllers/orderController.js"
import { admin, protect } from "./../middleware/authMiddleware.js"

const router = express.Router()

// create order (user)
router.post("/", protect, createOrder)

// get orders for a user
router.get("/find/:userId", protect, getUserOrders)

// admin routes
router.get("/", protect, admin, getAllOrders)
// router.get("/income", protect, admin, monthlyIncome)
router.get("/:id", protect, admin, getOrderById)
router.put("/:id", protect, admin, updateOrder)
router.delete("/:id", protect, admin, deleteOrder)

export default router
