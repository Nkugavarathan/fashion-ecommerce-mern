import express from "express"
import User from "../models/userModel.js"
import bcrypt from "bcrypt"
const router = express.Router()

//Register

// Generate salt
const salt = await bcrypt.genSalt(10)

// register
router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  })
  try {
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(500).json(err)
  }
})

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(404).json("User not found")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(401).json("Invalid password")

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
