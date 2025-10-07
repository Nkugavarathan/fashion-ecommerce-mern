import express from "express"
import { createOrder, monthlyIncome } from "./../controllers/orderController"
import { admin, protect } from "./../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", protect, createOrder)
router.post("/find/userId", protect, createOrder)
router.get("/income", monthlyIncome)
export default router
