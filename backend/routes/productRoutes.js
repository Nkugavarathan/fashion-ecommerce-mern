import express from "express"
import { admin, protect } from "./../middleware/authMiddleware.js"
import {
  getAllProducts,
  createProduct,
  upadateProduct,
  deleteProduct,
  getProductById,
  createMultipleProducts,
} from "../controllers/productControlloer.js"

const router = express.Router()

router.post("/", protect, admin, createProduct)
router.put("/:id", protect, admin, upadateProduct)
router.get("/find/:id", getProductById)
router.get("/", admin, protect, getAllProducts)
router.delete("/:id", protect, admin, deleteProduct)

router.post("/bulk", createMultipleProducts)

export default router
