import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1
      state.products.push(action.payload)
      state.total += action.payload.price * action.payload.quantity
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      )
      state.quantity = state.products.length
      state.total = state.products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    },
    updateQuantity: (state, action) => {
      const product = state.products.find(
        (item) => item._id === action.payload.id
      )
      if (product) {
        const diff = action.payload.quantity - product.quantity
        product.quantity = action.payload.quantity
        state.total += diff * product.price
      }
    },
    clearCart: (state) => {
      state.products = []
      state.quantity = 0
      state.total = 0
    },
  },
})

export const { addProduct, removeProduct, updateQuantity, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
