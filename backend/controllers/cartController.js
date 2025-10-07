import Cart from "../models/cartModel.js"

//create cart
export const createCart = async (req, res) => {
  const newCart = new Cart(req.body)
  try {
    const savedCart = await newCart.save()
    res.status(200).json(savedCart)
  } catch (error) {
    res.status(500).json(error)
  }
}

//update

export const upadateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    )
    res.status(200).json(updatedCart)
  } catch (error) {
    res.status(500).json(error)
  }
}

// get all
export const getAll = async (req, res) => {
  try {
    const carts = await Cart.find()
    res.status(200).json(carts)
  } catch (error) {
    res.status(500).json(error)
  }
}

//get userCart by id
export const getCartById = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.id })
    res.status(200).json(cart)
  } catch (err) {
    res.status(500).json(err)
  }
}

//delete Cart
export const deleteCart = async (req, res) => {
  try {
    const deleteCart = await Cart.findByIdAndDelete(req.params.id)
    if (!deleteCart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    res.status(200).json({ message: `Deleted Cart ${req.params.id}` })
  } catch (error) {
    console.error("Delete error:", error)
    res.status(400).json({ message: "Couldn't delete it. Something's wrong." })
  }
}
