import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import connectDB from "./config/db.js"

// Routes
import userRoute from "./routes/userRoutes.js"
import authRoute from "./routes/authRoute.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import stripeRoute from "./routes/stripe.js"

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()
const port = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// 🧠 For resolving __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ✅ Serve static uploaded images
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// ✅ API Routes
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/checkout", stripeRoute)

// ✅ Fallback route
app.get("/", (req, res) => {
  res.send("🚀 E-commerce API is running successfully!")
})

// ✅ Start the server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`)
})
