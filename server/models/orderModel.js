import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        price: { type: Number, default: 0 },
      },
    ],
    amount: { type: Number, required: true }, // ✅ Make sure this exists
    address: {
      name: { type: String },
      email: { type: String },
      address: { type: String },
    },
    payment: {
      cardLast4: { type: String },
      method: { type: String },
    },
    status: { type: String, default: "processing" },
  },
  { timestamps: true }
)

const orderModel = mongoose.model("Order", OrderSchema)

export default orderModel
