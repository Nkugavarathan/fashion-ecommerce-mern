import express from "express"
import {
  createOrder,
  getOrderById,
  getAllOrders,
  monthlyIncome,
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
router.get("/", getAllOrders)
router.get("/income", protect, admin, monthlyIncome)
router.get("/:id", getOrderById)
router.put("/:id", protect, admin, updateOrder)
router.delete("/:id", protect, admin, deleteOrder)

export default router
