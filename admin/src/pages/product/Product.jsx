import { Link, useParams } from "react-router-dom"
import { Publish } from "@mui/icons-material"
import { useSelector, useDispatch } from "react-redux"
import { updateProduct } from "../../redux/apiCalls"
import { useState, useEffect } from "react"

export default function Product() {
  const { productId } = useParams()
  const dispatch = useDispatch()

  const product = useSelector((state) =>
    state.product.products.find((item) => item._id === productId)
  )

  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [inStock, setInStock] = useState("yes")
  const [gender, setGender] = useState("") // main category
  const [categories, setCategories] = useState([]) // subcategories array
  const [sizes, setSizes] = useState([]) // size array
  const [colors, setColors] = useState([]) // color array
  const [imagePreview, setImagePreview] = useState(null)
  const [file, setFile] = useState(null)

  useEffect(() => {
    if (product) {
      setTitle(product.title || "")
      setPrice(product.price ?? "")
      setDescription(product.description || product.desc || "")
      setInStock(product.inStock ? "yes" : "no")
      setGender(product.gender || product.category)
      setCategories(Array.isArray(product.categories) ? product.categories : [])

      //  Parse sizes if stored as JSON string
      try {
        const parsedSizes =
          typeof product.size === "string"
            ? JSON.parse(product.size)
            : product.size
        setSizes(Array.isArray(parsedSizes) ? parsedSizes : [])
      } catch {
        setSizes([])
      }

      // ✅ Parse colors if stored as JSON string
      try {
        const parsedColors =
          typeof product.color === "string"
            ? JSON.parse(product.color)
            : product.color
        setColors(Array.isArray(parsedColors) ? parsedColors : [])
      } catch {
        setColors([])
      }

      setImagePreview(product.image || null)
    }
  }, [product])

  const handleFileChange = (e) => {
    const selected = e.target.files && e.target.files[0]
    if (selected) {
      setFile(selected)
      setImagePreview(URL.createObjectURL(selected))
    }
  }

  const handleMultiSelect = (e, setter) => {
    const selected = Array.from(e.target.selectedOptions).map((o) => o.value)
    setter(selected)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", title)
    formData.append("price", price)
    formData.append("desc", description)
    // send inStock as string/boolean; backend will normalize
    formData.append("inStock", inStock === "yes")
    formData.append("gender", gender)
    formData.append("categories", JSON.stringify(categories))
    formData.append("size", JSON.stringify(sizes))
    formData.append("color", JSON.stringify(colors))
    if (file) formData.append("image", file) // multer key = "image"

    try {
      await updateProduct(productId, formData, dispatch)
      alert("✅ Product update request sent")
    } catch (err) {
      console.error("Update failed:", err)
      alert("❌ Update failed — check server logs / network tab")
    }
  }

  return (
    <div className="flex-[4] p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <img
              src={imagePreview || "https://via.placeholder.com/150"}
              alt={title}
              className="w-24 h-24 rounded-lg object-cover mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-gray-500">ID: {product?._id}</p>
              <p className="text-sm text-gray-600 mt-2">{description}</p>
            </div>
          </div>

          <div className="text-gray-700 space-y-1">
            <p>
              <span className="font-semibold">Price:</span> Rs {price}
            </p>
            <p>
              <span className="font-semibold">In Stock:</span>{" "}
              {inStock === "yes" ? "Yes" : "No"}
            </p>
            {/* <p>
              <span className="font-semibold">Main Category:</span> {gender}
            </p> */}
            <p>
              <span className="font-semibold">Categories:</span>{" "}
              {categories.join(", ")}
            </p>
            <p>
              <span className="font-semibold">Sizes:</span> {sizes.join(", ")}
            </p>
            <p>
              <span className="font-semibold">Colors:</span> {colors.join(", ")}
            </p>
          </div>
        </div>

        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <form
            onSubmit={handleUpdate}
            className="flex flex-col gap-4 text-gray-700"
          >
            <div>
              <label className="font-semibold">Product Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="font-semibold">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold">Price (LKR)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="font-semibold">In Stock</label>
              <select
                value={inStock}
                onChange={(e) => setInStock(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">Main Category(Gender)</label>
              <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="unisex">Unisex</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">
                Subcategories (Ctrl/Cmd to multi-select)
              </label>
              <select
                multiple
                value={categories}
                onChange={(e) => handleMultiSelect(e, setCategories)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 h-28"
              >
                <option value="shirt">shirt</option>
                <option value="longwear">longwear</option>
                <option value="jackets">jackets</option>
                <option value="casual">casual</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">Sizes (multi)</label>
              <select
                multiple
                value={sizes}
                onChange={(e) => handleMultiSelect(e, setSizes)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 h-24"
              >
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">Colors (multi)</label>
              <select
                multiple
                value={colors}
                onChange={(e) => handleMultiSelect(e, setColors)}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 h-24"
              >
                <option value="red">red</option>
                <option value="blue">blue</option>
                <option value="green">green</option>
                <option value="black">black</option>
                <option value="white">white</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="font-semibold">Image</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-blue-600">
                  <Publish />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <span className="text-sm text-gray-500">
                  {file ? file.name : "Keep existing image if none selected"}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md self-start"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
