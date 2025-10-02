import express from "express"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import userRoute from "./routes/userRoutes.js"
// work dotenv
dotenv.config()

const app = express()

const port = process.env.PORT || 5000
// mongoose
connectDB()

app.use(express.json())
app
  .use("/api/users", userRoute)

  //run
  .listen(port, () => {
    console.log("server is runnning")
  })
