import { model, Schema } from "mongoose"

const cartSchema = new Schema(
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
  },
  { timestamps: true }
)

const Cart = model("Cart", cartSchema)
export default Cart
