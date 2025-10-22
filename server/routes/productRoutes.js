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

// router.get("/search", async (req, res) => {
//   try {
//     const { q } = req.query

//     if (!q || q.length < 2) {
//       return res.status(400).json({ error: "Search query too short" })
//     }

//     const products = await Product.find({
//       $or: [
//         { title: { $regex: q, $options: "i" } },
//         { description: { $regex: q, $options: "i" } },
//         { category: { $regex: q, $options: "i" } },
//         { tags: { $in: [new RegExp(q, "i")] } },
//       ],
//       isActive: true,
//     })
//       .select("title price image category inStock")
//       .limit(10)
//       .sort({ createdAt: -1 })

//     res.json(products)
//   } catch (error) {
//     console.error("Search error:", error)
//     res.status(500).json({ error: "Internal server error" })
//   }
// })

export default router
