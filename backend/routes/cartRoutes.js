import express from "express"
import {
  createCart,
  deleteCart,
  getAll,
  getCartById,
  upadateCart,
} from "../controllers/cartController"

const router = express.Router()

router.post("/create", protect, createCart)

router.put("/:id", protect, upadateCart)

//getusercart
router.get("/:userid", protect, getCartById)

router.delete("/:id", protect, deleteCart)

//getall
router.get("/", getAll)
export default router
