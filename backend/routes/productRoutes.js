import express from "express"
import { admin, protect } from "./../middleware/authMiddleware.js"
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  createMultipleProducts,
} from "../controllers/productControlloer.js"
import { upload } from "../middleware/uploadMiddleware.js"

const router = express.Router()

// create product (with optional image)
router.post("/", upload.single("image"), createProduct)

// update product (with optional image)
router.put("/:id", upload.single("image"), updateProduct)
router.get("/find/:id", getProductById)
router.get("/", getAllProducts)
router.delete("/:id", protect, admin, deleteProduct)

router.post("/bulk", createMultipleProducts)

export default router
