import { createSlice } from "@reduxjs/toolkit"

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    createOrderStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    createOrderSuccess: (state, action) => {
      state.isFetching = false
      state.orders.push(action.payload)
    },
    createOrderFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
  },
})

export const { createOrderStart, createOrderSuccess, createOrderFailure } =
  orderSlice.actions

export default orderSlice.reducer
