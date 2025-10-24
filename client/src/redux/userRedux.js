// import { createSlice } from "@reduxjs/toolkit"

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     currentUser: null,
//     isFetching: false,
//     error: false,
//   },
//   reducers: {
//     loginStart: (state) => {
//       state.isFetching = true
//     },
//     loginSuccess: (state, action) => {
//       state.isFetching = false
//       state.currentUser = action.payload
//     },
//     loginFailure: (state) => {
//       state.isFetching = false
//       state.error = true
//     },
//   },
// })

// export const { loginFailure, loginStart, loginSuccess } = userSlice.actions
// export default userSlice.reducer

import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    token: null,
    isFetching: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.isFetching = false
      // action.payload expected { user, token }
      state.currentUser = action.payload?.user ?? null
      state.token = action.payload?.token ?? null
    },
    loginFailure: (state, action) => {
      state.isFetching = false
      state.error = action.payload ?? true
    },
    logout: (state) => {
      state.currentUser = null
      state.token = null
      state.error = null
      state.isFetching = false
    },
  },
})

export const { loginFailure, loginStart, loginSuccess, logout } =
  userSlice.actions
export default userSlice.reducer
