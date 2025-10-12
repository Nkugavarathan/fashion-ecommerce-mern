import { model, Schema } from "mongoose"

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },
    image: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const Product = model("Product", productSchema)
export default Product
