import express from "express"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import userRoute from "./routes/userRoutes.js"
import authRoute from "./routes/authRoute.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

// work dotenv
dotenv.config()

const app = express()

const port = process.env.PORT || 5000
// mongoose
connectDB()

app.use(express.json())
app.use("/api/users", userRoute)

app.use("/api/auth", authRoute)
app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes)
app
  .use("/api/orders", orderRoutes)

  //run
  .listen(port, () => {
    console.log("server is runnning")
  })
