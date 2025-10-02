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
    size: { type: String },
    color: { type: String },
    pirce: { type: String, required: true },
  },
  { timestamps: true }
)

const productModel = model("Product", productSchema)

export default productModel
