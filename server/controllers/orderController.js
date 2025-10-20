// import Order from "../models/orderModel.js"
import User from "../models/userModel.js"
//create order
// export const createOrder = async (req, res) => {
//   const newOrder = new Order(req.body)
//   try {
//     const savedOrder = await newOrder.save()
//     res.status(200).json(savedOrder)
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }

// //update

// export const upadateOrder = async (req, res) => {
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       {
//         new: true,
//       }
//     )
//     res.status(200).json(updatedOrder)
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }

// // get all
// // export const getAll = async (req, res) => {
// //   try {
// //     const orders = await Order.find()
// //     res.status(200).json(orders)
// //   } catch (error) {
// //     res.status(500).json(error)
// //   }
// // }

// export const getAll = async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 }) // latest first

//     // attach user info
//     const ordersWithUser = await Promise.all(
//       orders.map(async (order) => {
//         const user = await User.findById(order.userId)
//         return {
//           ...order._doc,
//           username: user?.username || "Unknown",
//           image: user?.image || "https://via.placeholder.com/40",
//         }
//       })
//     )

//     res.status(200).json(ordersWithUser)
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }

// //get userOrder by id
// export const getOrderById = async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.id })
//     res.status(200).json(orders)
//   } catch (err) {
//     res.status(500).json(err)
//   }
// }

// //delete Order
// export const deleteOrder = async (req, res) => {
//   try {
//     const deleteOrder = await Order.findByIdAndDelete(req.params.id)
//     if (!deleteOrder) {
//       return res.status(404).json({ message: "Order not found" })
//     }

//     res.status(200).json({ message: `Deleted Order ${req.params.id}` })
//   } catch (error) {
//     console.error("Delete error:", error)
//     res.status(400).json({ message: "Couldn't delete it. Something's wrong." })
//   }
// }

import Order from "../models/orderModel.js"

// Create order (no Stripe) — accepts cart, amount, address and paymentInfo
// export const createOrder = async (req, res) => {
//   try {
//     // Expect body: { userId, products, amount, address, paymentInfo }
//     const { userId, products, amount, address, paymentInfo } = req.body

//     // Basic validation
//     if (!userId || !products || !amount) {
//       return res.status(400).json({ message: "Missing required order fields" })
//     }

//     // Build order object
//     const newOrder = new Order({
//       userId,
//       products,
//       amount,
//       address: address || {},
//       payment: {
//         // Do NOT store full card details in production. For practice project we store masked info.
//         cardLast4:
//           paymentInfo?.cardNumber?.slice(-4) ||
//           (paymentInfo?.card && paymentInfo.card.slice(-4)) ||
//           null,
//         method: paymentInfo?.method || "card",
//         paid: true,
//       },
//       status: "processing",
//     })

//     const saved = await newOrder.save()
//     return res.status(201).json(saved)
//   } catch (err) {
//     console.error("createOrder error:", err)
//     return res
//       .status(500)
//       .json({ message: "Create order failed", error: err.message })
//   }
// }

export const createOrder = async (req, res) => {
  try {
    const { userId, products, amount, address, paymentInfo } = req.body
    if (!userId || !products || !amount) {
      return res.status(400).json({ message: "Missing required order fields" })
    }

    const newOrder = new Order({
      userId,
      products,
      amount,
      address: address || {},
      payment: {
        cardLast4: paymentInfo?.cardNumber?.slice(-4) || null,
        method: paymentInfo?.method || "card",
        paid: true,
      },
      status: "processing",
    })

    const saved = await newOrder.save()
    return res.status(201).json(saved)
  } catch (err) {
    console.error("createOrder error:", err)
    // handle duplicate key index error specifically
    if (err && err.code === 11000 && err.keyPattern && err.keyPattern.userId) {
      return res.status(409).json({
        message:
          "Duplicate index error on orders.userId — your orders collection currently has a unique index on userId. Drop that index to allow multiple orders per user.",
        details: err.keyValue,
      })
    }
    return res
      .status(500)
      .json({ message: "Create order failed", error: err.message })
  }
}

// Get orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId
    const orders = await Order.find({ userId }).sort({ createdAt: -1 })
    return res.status(200).json(orders)
  } catch (err) {
    console.error("getUserOrders error:", err)
    return res
      .status(500)
      .json({ message: "Could not fetch orders", error: err.message })
  }
}

// (Optional) Admin: get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    return res.status(200).json(orders)
  } catch (err) {
    console.error("getAllOrders error:", err)
    return res
      .status(500)
      .json({ message: "Could not fetch orders", error: err.message })
  }
}

// Update order status (admin)
export const updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    return res.status(200).json(updated)
  } catch (err) {
    console.error("updateOrder error:", err)
    return res
      .status(500)
      .json({ message: "Update failed", error: err.message })
  }
}

//get monthy income
export const monthlyIncome = async (req, res) => {
  const date = new Date()
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ])
    res.status(200).json(income)
  } catch (err) {
    res.status(500).json(err)
  }
}

// delete Order
export const deleteOrder = async (req, res) => {
  try {
    const deleteOrder = await Order.findByIdAndDelete(req.params.id)
    if (!deleteOrder) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.status(200).json({ message: `Deleted Order ${req.params.id}` })
  } catch (error) {
    console.error("Delete error:", error)
    res.status(400).json({ message: "Couldn't delete it. Something's wrong." })
  }
}

export const getAll = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }) // latest first

    // attach user info
    const ordersWithUser = await Promise.all(
      orders.map(async (order) => {
        const user = await User.findById(order.userId)
        return {
          ...order._doc,
          username: user?.username || "Unknown",
          image: user?.image || "https://via.placeholder.com/40",
        }
      })
    )

    res.status(200).json(ordersWithUser)
  } catch (error) {
    res.status(500).json(error)
  }
}
