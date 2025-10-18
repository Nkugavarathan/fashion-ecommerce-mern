import { Link, useParams } from "react-router-dom"
import { Publish } from "@mui/icons-material"
import { useSelector, useDispatch } from "react-redux"
import { updateProduct } from "../../redux/apiCalls"
import { useState } from "react"

export default function Product() {
  const { productId } = useParams()
  const dispatch = useDispatch()

  // Get product from Redux store
  const product = useSelector((state) =>
    state.product.products.find((item) => item._id === productId)
  )

  // Local state for form inputs
  const [title, setTitle] = useState(product?.title || "")
  const [price, setPrice] = useState(product?.price || "")
  const [inStock, setInStock] = useState(product?.inStock ? "yes" : "no")
  const [image, setImage] = useState(product?.image || null)
  const [file, setFile] = useState(null)

  // const handleUpdate = (e) => {
  //   e.preventDefault()

  //   // Create FormData if image file selected
  //   let updatedProduct = {
  //     ...product,
  //     title,
  //     price,
  //     inStock: inStock === "yes",
  //   }

  //   if (file) {
  //     // You can handle file upload in your backend
  //     // For now, preview image URL used for testing
  //     updatedProduct.image = URL.createObjectURL(file)
  //   }

  //   updateProduct(productId, updatedProduct, dispatch)
  //   alert("✅ Product updated successfully!")
  // }
  const handleUpdate = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", title)
    formData.append("price", price)
    formData.append("inStock", inStock === "yes")
    if (file) {
      formData.append("image", file)
    }

    updateProduct(productId, formData, dispatch)
    alert("✅ Product updated successfully!")
  }

  return (
    <div className="flex-[4] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
        <Link to="/newproduct">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md">
            Create New
          </button>
        </Link>
      </div>

      {/* Product Info */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <img
              src={image || "https://via.placeholder.com/150"}
              alt={title}
              className="w-20 h-20 rounded-lg object-cover mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-gray-500">ID: {product?._id}</p>
            </div>
          </div>

          <div className="text-gray-700 space-y-1">
            <p>
              <span className="font-semibold">Price:</span> {price}
            </p>
            <p>
              <span className="font-semibold">In Stock:</span>{" "}
              {inStock === "yes" ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Update Form */}
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
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">Product Image</label>
              <div className="flex items-center gap-3 mt-1">
                <img
                  src={file ? URL.createObjectURL(file) : image}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-md"
                />
                <label
                  htmlFor="file"
                  className="cursor-pointer text-blue-600 flex items-center gap-1"
                >
                  <Publish /> Upload
                </label>
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-md mt-4"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
