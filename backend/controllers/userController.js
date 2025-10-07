import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const isAdmin =
      typeof req.body.isAdmin === "boolean" ? req.body.isAdmin : false

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: isAdmin,
    })

    const savedUser = await newUser.save()

    // Generate token
    const accessToken = jwt.sign(
      { id: savedUser._id, isAdmin: savedUser.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    )

    res.status(201).json({ user: savedUser, token: accessToken })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(404).json("User not found")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(401).json("Invalid password")

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: "30d" }
    )

    res.status(200).json({ user, token: accessToken })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// get all users - latest 5 users
export const getAllUser = async (req, res) => {
  const query = req.query.new
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5) // Latest 5 user
      : await User.find() // all user
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
}
//get user by id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
}

// Update user
export const updateUser = async (req, res) => {
  try {
    // Only user himself or admin can update
    if (req.user.id === req.params.id || req.user.isAdmin) {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body }, // update only the fields provided
        { new: true } // return updated document
      )

      return res.status(200).json(updatedUser)
    } else {
      return res
        .status(403)
        .json({ message: "Not allowed to update this user" })
    }
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

//delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ message: `Deleted User ${req.params.id}` })
  } catch (error) {
    console.error("Delete error:", error)
    res.status(400).json({ message: "Couldn't delete it. Something's wrong." })
  }
}

//get user stats
export const getUserStats = async (req, res) => {
  const date = new Date()
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ])
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}
