import { model, Schema } from "mongoose"

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },

    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
)

const orderModel = model("Order", orderSchema)

export default orderModel
