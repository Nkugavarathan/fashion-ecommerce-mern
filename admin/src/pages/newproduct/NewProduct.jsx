import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addProduct } from "../../redux/apiCalls"

// export default function NewProduct() {
//   const [inputs, setInputs] = useState({})
//   const [file, setFile] = useState(null)
//   const [categories, setCategories] = useState([]) // array
//   const [sizes, setSizes] = useState([]) // array
//   const [colors, setColors] = useState([]) // array
//   const [gender, setGender] = useState("") // men / women / unisex
//   const dispatch = useDispatch()

// const handleChange = (e) => {
//   setInputs((prev) => ({
//     ...prev,
//     [e.target.name]: e.target.value,
//   }))
// }
//   // multi-select handler
//   const handleMultiSelect = (e, setter) => {
//     const selected = Array.from(e.target.selectedOptions).map((o) => o.value)
//     setter(selected)
//   }

//   const handleClick = (e) => {
//     e.preventDefault()

//     if (!file) {
//       alert("Please upload an image!")
//       return
//     }
//     //upload image size
//     const maxSizeMB = 10
//     const maxSizeBytes = maxSizeMB * 1024 * 1024

//     if (file.size > maxSizeBytes) {
//       alert(
//         `❌ Image too large. Please upload a file smaller than ${maxSizeMB}MB.`
//       )
//       return
//     }

//     const formData = new FormData()
//     formData.append("title", inputs.title || "")
//     // formData.append("desc", inputs.desc || "")
//     formData.append("description", inputs.desc || "")

//     formData.append("price", inputs.price || "")
//     formData.append("inStock", inputs.inStock ?? "true")
//     // send arrays as JSON strings so backend can parse reliably
//     formData.append("categories", JSON.stringify(categories))
//     formData.append("size", JSON.stringify(sizes))
//     formData.append("color", JSON.stringify(colors))
//     formData.append("gender", gender)
//     formData.append("image", file)

//     addProduct(formData, dispatch)
//       .then(() => {
//         alert("✅ Product add request sent")
//         setInputs({})
//         setFile(null)
//         setCategories([])
//         setSizes([])
//         setColors([])
//         setGender("")
//         // optionally refresh product list: getProducts(dispatch)
//       })
//       .catch((err) => {
//         console.error("Add product failed:", err)
//         alert("❌ Create failed — check server logs / network tab")
//       })
//   }
// }
export default function NewProduct() {
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [categories, setCategories] = useState([]) // array
  const [sizes, setSizes] = useState([]) // array
  const [colors, setColors] = useState([]) // array
  const [gender, setGender] = useState("") // men / women / unisex
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  // multi-select handler
  const handleMultiSelect = (e, setter) => {
    const selected = Array.from(e.target.selectedOptions).map((o) => o.value)
    setter(selected)
  }
  const handleClick = (e) => {
    e.preventDefault()

    if (!file) {
      alert("Please upload an image!")
      return
    }
    const maxSizeMB = 10
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxSizeBytes) {
      alert(
        `❌ Image too large. Please upload a file smaller than ${maxSizeMB}MB.`
      )
      return
    }

    // Validate file size (max 10 MB)

    const formData = new FormData()
    formData.append("title", inputs.title || "")
    formData.append("description", inputs.desc || "")
    formData.append("price", inputs.price || "")
    formData.append("inStock", inputs.inStock ?? "true")

    // ✅ Merge gender + subcategories together
    const allCategories = gender ? [gender, ...categories] : [...categories]
    formData.append("categories", JSON.stringify(allCategories))

    formData.append("size", JSON.stringify(sizes))
    formData.append("color", JSON.stringify(colors))
    formData.append("gender", gender)
    formData.append("image", file)

    addProduct(formData, dispatch)
      .then(() => {
        alert("✅ Product added successfully")
        // Reset form
        setInputs({})
        setFile(null)
        setCategories([])
        setSizes([])
        setColors([])
        setGender("")
      })
      .catch((err) => {
        console.error("Add product failed:", err)
        alert("❌ Create failed — check console or server logs")
      })
  }

  return (
    <div className="flex-[4] h-[70vh] bg-gray-50 p-6 rounded-lg shadow-md ms-3 overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>
      <form
        className="flex flex-col sm:flex-row sm:flex-wrap gap-6"
        onSubmit={handleClick}
      >
        {/* Image Upload */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Title */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">Title</label>
          <input
            name="title"
            type="text"
            placeholder="Jeans"
            value={inputs.title || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">
            Description
          </label>
          <input
            name="desc"
            type="text"
            placeholder="Product description..."
            value={inputs.desc || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">Price (Rs)</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            value={inputs.price || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Main category: men/women/unisex */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">
            Main Category (Gender)
          </label>
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

        {/* Subcategories (multi) */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">
            Subcategories (hold Ctrl/Cmd to select multiple)
          </label>
          <select
            multiple
            value={categories}
            onChange={(e) => handleMultiSelect(e, setCategories)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 h-32"
          >
            <option value="shirt">shirt</option>
            <option value="longwear">longwear</option>
            <option value="jackets">jackets</option>
            <option value="casual">casual</option>
          </select>
        </div>

        {/* Size (multi) */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">Size</label>
          <select
            multiple
            value={sizes}
            onChange={(e) => handleMultiSelect(e, setSizes)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 h-32"
          >
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        {/* Color (multi) */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">Color</label>
          <select
            multiple
            value={colors}
            onChange={(e) => handleMultiSelect(e, setColors)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 h-32"
          >
            <option value="red">red</option>
            <option value="blue">blue</option>
            <option value="green">green</option>
            <option value="black">black</option>
            <option value="white">white</option>
          </select>
        </div>

        {/* Stock */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">Stock</label>
          <select
            name="inStock"
            value={inputs.inStock ?? "true"}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-6 rounded-lg mt-4 transition-all duration-200"
        >
          Create
        </button>
      </form>
    </div>
  )
}
