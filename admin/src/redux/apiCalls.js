import { publicRequest, userRequest } from "../requestMethod"
import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import axios from "axios"
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux"

//login
export const login = async (dispatch, user) => {
  console.log("Login started...")
  dispatch(loginStart(user))
  try {
    const res = await userRequest.post("/auth/login", user)
    console.log("Login success:", res.data)
    dispatch(loginSuccess(res.data))
  } catch (error) {
    console.error("Login failed:", error)
    dispatch(loginFailure())
  }
}

export const getProducts = async (dispatch) => {
  dispatch(getProductStart())
  try {
    const res = await publicRequest.get("/products")
    dispatch(getProductSuccess(res.data))
  } catch (err) {
    dispatch(getProductFailure())
  }
}

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart())
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id))
  } catch (err) {
    dispatch(deleteProductFailure())
  }
}

// export const updateProduct = async (id, product, dispatch) => {
//   dispatch(updateProductStart())
//   try {
//     // update
//     dispatch(updateProductSuccess({ id, product }))
//   } catch (err) {
//     dispatch(updateProductFailure())
//   }
// }
export const updateProduct = async (id, formData, dispatch) => {
  dispatch(updateProductStart())
  try {
    const res = await userRequest.put(`/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    dispatch(updateProductSuccess({ id, product: res.data }))
  } catch (err) {
    console.log(err)
    dispatch(updateProductFailure())
  }
}

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart())
  try {
    const res = await userRequest.post(`/products`, product)
    dispatch(addProductSuccess(res.data))
  } catch (err) {
    dispatch(addProductFailure())
  }
}
