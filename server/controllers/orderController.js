import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"

//   try {
//     let { userId, products, amount, address, paymentInfo } = req.body

//     if (!userId || !products) {
//       return res.status(400).json({ message: "Missing required order fields" })
//     }

//     // If products were sent as a JSON string (FormData), parse it
//     if (typeof products === "string") {
//       try {
//         products = JSON.parse(products)
//       } catch {
//         // try simple split fallback (comma separated)
//         products = products
//           .split(",")
//           .map((s) => s.trim())
//           .filter(Boolean)
//           .map((p) => ({ title: p, quantity: 1, price: 0 }))
//       }
//     }

//     // Normalize products array: ensure title, price, quantity are present.
//     // If productId provided but title/price missing, fetch product snapshot from products collection.
//     const normalized = await Promise.all(
//       products.map(async (p) => {
//         const qty = Number(p.quantity ?? p.qty ?? 1)
//         // if there is a productId, try to enrich from DB
//         if (p.productId) {
//           try {
//             const prod = await Product.findById(p.productId).lean()
//             return {
//               productId: p.productId,
//               title: p.title || prod?.title || prod?.name || "Unknown Product",
//               price: Number(p.price ?? prod?.price ?? 0),
//               quantity: qty,
//               image: p.image || prod?.image || "",
//             }
//           } catch (err) {
//             // fallback if product lookup fails
//             return {
//               productId: p.productId,
//               title: p.title || "Unknown Product",
//               price: Number(p.price ?? 0),
//               quantity: qty,
//               image: p.image || "",
//             }
//           }
//         }

//         // otherwise use provided snapshot (title/price)
//         return {
//           productId: p.productId || null,
//           title: p.title || "Unknown Product",
//           price: Number(p.price ?? 0),
//           quantity: qty,
//           image: p.image || "",
//         }
//       })
//     )

//     // Compute amount reliably from normalized products (price * qty)
//     const computedAmount = normalized.reduce(
//       (sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 0),
//       0
//     )
//     amount = Number(amount) || computedAmount

//     const newOrder = new Order({
//       userId,
//       products: normalized,
//       amount,
//       address: address || {},
//       payment: {
//         cardLast4: paymentInfo?.cardNumber
//           ? String(paymentInfo.cardNumber).slice(-4)
//           : paymentInfo?.cardLast4 || null,
//         method: paymentInfo?.method || "card",
//         paid: true,
//       },
//       status: "processing",
//     })

//     const saved = await newOrder.save()
//     return res.status(201).json(saved)
//   } catch (err) {
//     console.error("createOrder error:", err)
//     if (err && err.code === 11000 && err.keyPattern && err.keyPattern.userId) {
//       return res.status(409).json({
//         message:
//           "Duplicate index error on orders.userId — drop the unique index on userId to allow multiple orders per user.",
//         details: err.keyValue,
//       })
//     }
//     return res
//       .status(500)
//       .json({ message: "Create order failed", error: err.message })
//   }
// }

// Get all orders (admin) — populate user and enrich product snapshots
export const createOrder = async (req, res) => {
  try {
    console.log("✅ Authenticated user:", req.user?.username || req.user?.id)
    console.log("🧾 Incoming order payload:", req.body)

    const { userId, products, amount, address, payment } = req.body

    // Validate basic fields
    if (!userId || !products?.length || !amount) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const newOrder = new Order({
      userId,
      products,
      amount: Number(amount), // ensure numeric
      address,
      payment,
    })

    const savedOrder = await newOrder.save()
    console.log("✅ Order saved:", savedOrder)

    res.status(201).json(savedOrder)
  } catch (err) {
    console.error("❌ Order creation failed:", err)
    res.status(500).json({ message: err.message })
  }
}

export const getAllOrders = async (req, res) => {
  try {
    // populate user basic fields
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("userId", "username email")
      .lean()

    // Enrich each order.products with product title/price if missing
    for (const order of orders) {
      if (!order.products || !order.products.length) continue
      for (const p of order.products) {
        // If title already present skip
        if (p.title) continue
        if (!p.productId) {
          p.title = p.title || "Unknown Product"
          p.price = Number(p.price || 0)
          continue
        }
        try {
          const prod = await Product.findById(p.productId).lean()
          if (prod) {
            p.title = p.title || prod.title || prod.name || "Unknown Product"
            p.price = Number(p.price ?? prod.price ?? 0)
            p.image = p.image || prod.image || ""
          } else {
            p.title = p.title || "Unknown Product"
            p.price = Number(p.price || 0)
          }
        } catch {
          p.title = p.title || "Unknown Product"
          p.price = Number(p.price || 0)
        }
      }
    }

    return res.status(200).json(orders)
  } catch (err) {
    console.error("getAllOrders error:", err)
    return res
      .status(500)
      .json({ message: "Could not fetch orders", error: err.message })
  }
}

// Get single order by id (admin) — populate user and enrich products
export const getOrderById = async (req, res) => {
  try {
    const id = req.params.id
    const orderDoc = await Order.findById(id)
      .populate("userId", "username email")
      .lean()
    if (!orderDoc) return res.status(404).json({ message: "Order not found" })

    // enrich products same as above
    if (orderDoc.products && orderDoc.products.length) {
      for (const p of orderDoc.products) {
        if (p.title) continue
        if (!p.productId) {
          p.title = p.title || "Unknown Product"
          p.price = Number(p.price || 0)
          continue
        }
        try {
          const prod = await Product.findById(p.productId).lean()
          if (prod) {
            p.title = p.title || prod.title || prod.name || "Unknown Product"
            p.price = Number(p.price ?? prod.price ?? 0)
            p.image = p.image || prod.image || ""
          } else {
            p.title = p.title || "Unknown Product"
            p.price = Number(p.price || 0)
          }
        } catch {
          p.title = p.title || "Unknown Product"
          p.price = Number(p.price || 0)
        }
      }
    }

    return res.status(200).json(orderDoc)
  } catch (err) {
    console.error("getOrderById error:", err)
    return res
      .status(500)
      .json({ message: "Failed to fetch order", error: err.message })
  }
}

// Get orders for a user (used by profile) — enrich products too
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean()

    for (const order of orders) {
      if (!order.products) continue
      for (const p of order.products) {
        if (p.title) continue
        if (!p.productId) {
          p.title = p.title || "Unknown Product"
          p.price = Number(p.price || 0)
          continue
        }
        try {
          const prod = await Product.findById(p.productId).lean()
          if (prod) {
            p.title = p.title || prod.title || prod.name || "Unknown Product"
            p.price = Number(p.price ?? prod.price ?? 0)
            p.image = p.image || prod.image || ""
          } else {
            p.title = p.title || "Unknown Product"
            p.price = Number(p.price || 0)
          }
        } catch {
          p.title = p.title || "Unknown Product"
          p.price = Number(p.price || 0)
        }
      }
    }

    return res.status(200).json(orders)
  } catch (err) {
    console.error("getUserOrders error:", err)
    return res
      .status(500)
      .json({ message: "Could not fetch user orders", error: err.message })
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

// //get monthy income
// export const monthlyIncome = async (req, res) => {
//   const date = new Date()
//   const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
//   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

//   try {
//     const income = await Order.aggregate([
//       { $match: { createdAt: { $gte: previousMonth } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//           sales: "$amount",
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: "$sales" },
//         },
//       },
//     ])
//     res.status(200).json(income)
//   } catch (err) {
//     res.status(500).json(err)
//   }
// }

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
