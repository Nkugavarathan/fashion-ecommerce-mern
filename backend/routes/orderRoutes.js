import express from "express"
import {
  createOrder,
  getAll,
  monthlyIncome,
  upadateOrder,
} from "./../controllers/orderController.js"
import { admin, protect } from "./../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", protect, createOrder)
router.put("/:id", upadateOrder)
router.post("/find/userId", protect, createOrder)
router.get("/income", monthlyIncome)
router.delete("/:id", protect, admin)

//get all ordeer
router.get("/", protect, admin, getAll)
export default router
