import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct(state, action) {
      const product = action.payload
      const price = Number(product.price) // convert string → number

      state.quantity += 1
      state.products.push(action.payload)
      state.total += price * action.payload.quantity
    },
    // addProduct(state, action) {
    //   const product = action.payload
    //   if (product?.price && product?.quantity) {
    //     state.quantity += 1
    //     state.products.push(product)
    //     state.total += product.price * product.quantity
    //   } else {
    //     console.warn("Invalid product payload:", product)
    //   }
  },
})
export const { addProduct } = cartSlice.actions
export default cartSlice.reducer
