import express from "express"
import {
  createCart,
  deleteCart,
  getAll,
  getCartById,
  upadateCart,
} from "../controllers/cartController"
import { admin, protect } from "./../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", protect, createCart)

router.put("/:id", protect, upadateCart)

//getusercart
router.get("/find/:userId", protect, getCartById)

router.delete("/:id", protect, deleteCart)

//getall
router.get("/", protect, admin, getAll)
export default router
