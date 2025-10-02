import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const connectDB = async () => {
  try {
    console.log("✅ MongoDB connected")
    // console.log("MONGODB_URI is:", process.env.MONGODB_URI)

    await mongoose.connect(process.env.MONGODB_URI)
  } catch (error) {
    console.error("❌ DB connection error:", error.message)
    process.exit(1)
  }
}

export default connectDB
