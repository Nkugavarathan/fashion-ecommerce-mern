import Product from "../models/productModel.js"

//create product
// export const createProduct = async (req, res) => {
//   const newProduct = new Product(req.body)
//   try {
//     const savedProduct = await newProduct.save()
//     res.status(200).json(savedProduct)
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }

export const createProduct = async (req, res) => {
  try {
    const data = { ...req.body }

    // if multer stored a file, set the public URL
    if (req.file) {
      data.image = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`
    }

    // categories may be sent as JSON string
    if (data.categories && typeof data.categories === "string") {
      try {
        data.categories = JSON.parse(data.categories)
      } catch {
        data.categories = data.categories
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      }
    }

    // normalize inStock to boolean
    if (typeof data.inStock === "string") {
      data.inStock = data.inStock === "true" || data.inStock === "1"
    } else {
      data.inStock = Boolean(data.inStock)
    }

    // gender/main category field name used in frontend was "gender"
    if (data.gender) data.category = data.gender // optional: map to your schema field

    const newProduct = new Product(data)
    const saved = await newProduct.save()
    res.status(201).json(saved)
  } catch (err) {
    console.error("createProduct error:", err)
    res
      .status(500)
      .json({ message: "Create product failed", error: err.message })
  }
}

//create multiple product at onetime
export const createMultipleProducts = async (req, res) => {
  try {
    const products = await Product.insertMany(req.body)
    res.status(201).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// export const updateProduct = async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body }, // no need for multer if URL
//       { new: true }
//     )
//     res.status(200).json(updatedProduct)
//   } catch (err) {
//     res.status(500).json(err)
//   }
// }

// get all Products - latest 5 proProducts

// ...existing code...
// export const updateProduct = async (req, res) => {
//   try {
//     // copy fields from body
//     const updatedFields = { ...req.body }

//     // If multer uploaded a file, set served URL
//     if (req.file) {
//       // server serves /uploads via express.static in server.js
//       updatedFields.image = `${req.protocol}://${req.get("host")}/uploads/${
//         req.file.filename
//       }`
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       { $set: updatedFields },
//       { new: true }
//     )

//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Product not found" })
//     }

//     res.status(200).json(updatedProduct)
//   } catch (err) {
//     console.error("Update error:", err)
//     res.status(500).json({ message: "Error updating product", error: err })
//   }
// }

export const updateProduct = async (req, res) => {
  try {
    const data = { ...req.body }
    if (req.file) {
      data.image = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`
    }
    if (data.categories && typeof data.categories === "string") {
      try {
        data.categories = JSON.parse(data.categories)
      } catch {
        data.categories = data.categories
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      }
    }
    if (typeof data.inStock === "string")
      data.inStock = data.inStock === "true" || data.inStock === "1"
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: data },
      { new: true }
    )
    res.status(200).json(updated)
  } catch (err) {
    console.error("updateProduct error:", err)
    res.status(500).json({ message: "Update failed", error: err.message })
  }
}

export const getAllProducts = async (req, res) => {
  const qNew = req.query.new // ?new=true
  const qCategory = req.query.category // ?category=shirt
  // const qSize = req.query.size // ?size=m
  // const qColor = req.query.color // ?color=red
  // const qPriceGte = req.query.priceGte // ?priceGte=100
  // const qPriceLte = req.query.priceLte // ?priceLte=500

  try {
    let filter = {}

    // Category filter
    if (qNew) {
      productsQuery = await Product.find().sort({ createdAt: -1 }).limit(5)
    }
    if (qCategory) {
      filter.categories = { $in: [qCategory] }
    }

    // // Size filter
    // if (qSize) {
    //   filter.size = qSize
    // }

    // // Color filter
    // if (qColor) {
    //   filter.color = qColor
    // }

    // Price range filter
    // if (qPriceGte || qPriceLte) {
    //   filter.price = {}
    //   if (qPriceGte) filter.price.$gte = Number(qPriceGte)
    //   if (qPriceLte) filter.price.$lte = Number(qPriceLte)
    // }

    let productsQuery = Product.find(filter)

    // Latest products

    let products = await productsQuery

    if (products.length === 0) {
      // return res.status(200).json({ message: "No products found." })
      products = Product.find() // find all product when category item doent exist
    } else {
      // products = Product.find()
    }

    res.status(200).json(products)
  } catch (err) {
    res.status(500).json(err)
  }
}
//get proProduct by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
  } catch (err) {
    res.status(500).json(err)
  }
}

//delete Product
export const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id)
    if (!deleteProduct) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.status(200).json({ message: `Deleted Product ${req.params.id}` })
  } catch (error) {
    console.error("Delete error:", error)
    res.status(400).json({ message: "Couldn't delete it. Something's wrong." })
  }
}
