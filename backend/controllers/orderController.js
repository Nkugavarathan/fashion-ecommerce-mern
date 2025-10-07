import Order from "../models/orderModel.js"

//create order
export const createOrder = async (req, res) => {
  const newOrder = new Order(req.body)
  try {
    const savedOrder = await newOrder.save()
    res.status(200).json(savedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
}

//update

export const upadateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    )
    res.status(200).json(updatedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
}

// get all
export const getAll = async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
}

//get userOrder by id
export const getOrderById = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id })
    res.status(200).json(orders)
  } catch (err) {
    res.status(500).json(err)
  }
}

//delete Order
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
