import express from "express"
import { protect } from "./../middleware/authMiddleware.js"
import User from "../models/userModel.js"

const router = express.Router()

// get all users
router.get("/", async (req, res) => {
  try {
    const user = await User.find()
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put("/:id", protect, async (req, res) => {
  try {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
      res.json(200).json(updateUser)
    }
  } catch (err) {
    res.json(500).json(err)
  }
})

export default router
