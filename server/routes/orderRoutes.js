import express from "express"
import {
  createOrder,
  getAll,
  monthlyIncome,
  upadateOrder,
  deleteOrder,
} from "./../controllers/orderController.js"
import { admin, protect } from "./../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", protect, createOrder)
router.get("/", protect, admin, getAll)
router.get("/find/:userId", protect, getUserOrders)

router.put("/:id", upadateOrder)
router.post("/find/userId", protect, createOrder)
router.get("/income", monthlyIncome)
router.delete("/:id", protect, admin, deleteOrder)

//get all ordeer
router.get("/", getAll)
export default router
