import { configureStore } from "react-redux"

import cartReducer from "./cartRedux"

const store = configureStore({
  cart: cartReducer,
})

export default store
