import Product from "../models/productModel.js"

// create multiple product at onetime
export const createMultipleProducts = async (req, res) => {
  try {
    const products = await Product.insertMany(req.body)
    res.status(201).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getAllProducts = async (req, res) => {
  const qNew = req.query.new // ?new=true
  const qCategory = req.query.category // ?category=shirt
  // const qSize = req.query.size // ?size=m
  // const qColor = req.query.color // ?color=red
  // const qPriceGte = req.query.priceGte // ?priceGte=100
  // const qPriceLte = req.query.priceLte // ?priceLte=500
  const qSearch = req.query.search

  try {
    let filter = {}

    // Category filter
    if (qNew) {
      productsQuery = await Product.find().sort({ createdAt: -1 }).limit(5)
    }
    if (qCategory) {
      filter.categories = { $in: [qCategory] }
    }

    if (qSearch) {
      filter.title = { $regex: qSearch, $options: "i" } // case-insensitive
    }
    // const products = await Product.find(filter)
    // res.status(200).json(products)

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

// Search products by query (title, name, categories, description, brand)
// GET /api/products/search?q=shirt
export const searchProducts = async (req, res) => {
  try {
    const q = (req.query.q || "").trim()
    if (!q) return res.status(200).json([])

    // case-insensitive partial match
    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")

    const products = await Product.find({
      $or: [
        { title: regex },
        { name: regex },
        { description: regex },
        { brand: regex },
        { categories: regex }, // categories can be array or string
      ],
    })
      .limit(50)
      .lean()

    return res.status(200).json(products)
  } catch (err) {
    console.error("searchProducts error:", err)
    return res
      .status(500)
      .json({ message: "Search failed", error: err.message })
  }
}

/// new
// helper: normalize string → array
const normalizeArrayField = (data, fieldName) => {
  if (!data[fieldName]) {
    data[fieldName] = []
    return
  }
  if (Array.isArray(data[fieldName])) return
  if (typeof data[fieldName] === "string") {
    try {
      const parsed = JSON.parse(data[fieldName])
      data[fieldName] = Array.isArray(parsed) ? parsed : parsed ? [parsed] : []
    } catch {
      data[fieldName] = data[fieldName]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    }
  } else {
    data[fieldName] = [data[fieldName]]
  }
}

// ✅ Create Product
export const createProduct = async (req, res) => {
  try {
    const data = { ...req.body }

    // if multer uploaded image
    if (req.file) {
      data.image = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`
    }

    // normalize all arrays
    normalizeArrayField(data, "categories")
    normalizeArrayField(data, "size")
    normalizeArrayField(data, "color")

    // ensure boolean
    if (typeof data.inStock === "string") {
      data.inStock = data.inStock === "true" || data.inStock === "1"
    }

    // ✅ combine gender + subcategories
    if (data.gender) {
      const gender = data.gender.trim().toLowerCase()
      if (data.categories && !data.categories.includes(gender)) {
        data.categories = [gender, ...data.categories]
      }
    }

    const newProduct = new Product(data)
    const saved = await newProduct.save()
    res.status(201).json(saved)
  } catch (err) {
    console.error("createProduct error:", err)
    res.status(500).json({ message: "Create failed", error: err.message })
  }
}

// ✅ Update Product
export const updateProduct = async (req, res) => {
  try {
    const data = { ...req.body }

    // new image if uploaded
    if (req.file) {
      data.image = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`
    }

    normalizeArrayField(data, "categories")
    normalizeArrayField(data, "size")
    normalizeArrayField(data, "color")

    if (typeof data.inStock === "string") {
      data.inStock = data.inStock === "true" || data.inStock === "1"
    }

    // ensure gender is included
    if (data.gender) {
      const gender = data.gender.trim().toLowerCase()
      if (!data.categories.includes(gender)) {
        data.categories = [gender, ...data.categories]
      }
    }

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
