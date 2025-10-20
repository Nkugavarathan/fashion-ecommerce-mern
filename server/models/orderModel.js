import { mongoose, model } from "mongoose"

const OrderSchema = new mongoose.Schema(
  {
    // do NOT mark userId as unique — a user can have many orders
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
        price: { type: Number, default: 0 },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, default: {} },
    status: { type: String, default: "processing" },
    payment: { type: Object, default: {} },
  },
  { timestamps: true }
)

const orderModel = mongoose.model("Order", OrderSchema)

export default orderModel
