import express from "express"
import connectDB from "./config/db.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()

// mongoose
connectDB()

//run
app.listen(4000, () => {
  console.log("server is runnning")
})
