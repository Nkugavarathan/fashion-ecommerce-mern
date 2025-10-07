import express from "express"
import { admin, protect } from "./../middleware/authMiddleware.js"
import {
  getAllProducts,
  createProduct,
  upadateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/productControlloer.js"

const router = express.Router()

router.post("/", protect, admin, createProduct)
router.put("/:id", protect, admin, upadateProduct)
router.get("/:id", getProductById)
router.get("/", getAllProducts)
router.delete("/:id", protect, admin, deleteProduct)

export default router
