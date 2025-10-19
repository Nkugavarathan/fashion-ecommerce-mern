// import React, { useState } from "react"
// import { addProduct, getProducts } from "../../redux/apiCalls"
// import { useDispatch } from "react-redux"

// const SUBCATEGORIES = ["shirt", "longwear", "jackets", "casual"]

// export default function NewProduct() {
//   const [inputs, setInputs] = useState({})
//   const [file, setFile] = useState(null)
//   const [subcats, setSubcats] = useState([])
//   const [gender, setGender] = useState("unisex") // men / women / unisex
//   const dispatch = useDispatch()

//   const handleChange = (e) => {
//     setInputs((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }))
//   }

//   const toggleSubcat = (name) => {
//     setSubcats((prev) =>
//       prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
//     )
//   }

//   const handleClick = async (e) => {
//     e.preventDefault()

//     if (!file) {
//       alert("Please upload an image!")
//       return
//     }

//     const formData = new FormData()
//     formData.append("title", inputs.title || "")
//     formData.append("desc", inputs.desc || "")
//     formData.append("price", inputs.price || "")
//     formData.append("inStock", inputs.inStock ?? "true")
//     formData.append("categories", JSON.stringify(subcats))
//     formData.append("gender", gender)
//     formData.append("image", file)

//     try {
//       await addProduct(formData, dispatch) // wait for creation
//       // refresh product list in store so ProductList shows new item immediately
//       await getProducts(dispatch)
//       alert("✅ Product created and list refreshed")
//       // reset form
//       setInputs({})
//       setFile(null)
//       setSubcats([])
//       setGender("unisex")
//     } catch (err) {
//       console.error("Create product failed:", err)
//       alert("❌ Create failed")
//     }
//   }

//   return (
//     <div className="flex-[4] h-[70vh] bg-gray-50 p-6 rounded-lg shadow-md ms-3 overflow-y-auto">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>

//       <form
//         className="flex flex-col sm:flex-row sm:flex-wrap gap-6"
//         onSubmit={handleClick}
//       >
//         {/* Image Upload */}
//         <div className="flex flex-col w-full sm:w-[250px]">
//           <label className="text-gray-600 font-semibold mb-2">Image</label>
//           <input
//             type="file"
//             id="file"
//             accept="image/*"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Product Title */}
//         <div className="flex flex-col w-full sm:w-[250px]">
//           <label className="text-gray-600 font-semibold mb-2">Title</label>
//           <input
//             name="title"
//             type="text"
//             placeholder="Apple Airpods"
//             value={inputs.title || ""}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div className="flex flex-col w-full sm:w-[250px]">
//           <label className="text-gray-600 font-semibold mb-2">
//             Description
//           </label>
//           <input
//             name="desc"
//             type="text"
//             placeholder="Product description..."
//             value={inputs.desc || ""}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Price */}
//         <div className="flex flex-col w-full sm:w-[250px]">
//           <label className="text-gray-600 font-semibold mb-2">Price ($)</label>
//           <input
//             name="price"
//             type="number"
//             placeholder="100"
//             value={inputs.price || ""}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Main category: men/women/unisex */}
//         <div className="flex flex-col w-full sm:w-[250px]">
//           <label className="text-gray-600 font-semibold mb-2">
//             Main Category
//           </label>
//           <select
//             name="gender"
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//             className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="unisex">Unisex</option>
//             <option value="men">Men</option>
//             <option value="women">Women</option>
//           </select>
//         </div>

//         {/* Subcategories (checkboxes) */}
//         <div className="flex flex-col w-full sm:w-[250px]">
//           <label className="text-gray-600 font-semibold mb-2">
//             Subcategories
//           </label>
//           <div className="flex flex-wrap gap-2">
//             {SUBCATEGORIES.map((c) => (
//               <label key={c} className="inline-flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={subcats.includes(c)}
//                   onChange={() => toggleSubcat(c)}
//                   className="form-checkbox h-4 w-4 text-teal-600"
//                 />
//                 <span className="text-sm">{c}</span>
//               </label>
//             ))}
//           </div>
//           <p className="text-xs text-gray-500 mt-1">
//             Select one or more. These will be saved to "categories".
//           </p>
//         </div>

//         {/* Stock */}
//         <div className="flex flex-col w-full sm:w-[250px]">
//           <label className="text-gray-600 font-semibold mb-2">Stock</label>
//           <select
//             name="inStock"
//             value={inputs.inStock ?? "true"}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="true">Yes</option>
//             <option value="false">No</option>
//           </select>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-6 rounded-lg mt-4 transition-all duration-200"
//         >
//           Create
//         </button>
//       </form>
//     </div>
//   )
// }

import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addProduct } from "../../redux/apiCalls"

export default function NewProduct() {
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState([])
  const [gender, setGender] = useState("unisex") // men / women / unisex
  const dispatch = useDispatch()

  // const SUBCATEGORIES = ["shirt", "longwear", "jackets", "casual"]

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCat = (e) => {
    setCat(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()

    if (!file) {
      alert("Please upload an image!")
      return
    }

    const formData = new FormData()
    formData.append("title", inputs.title || "")
    formData.append("desc", inputs.desc || "")
    formData.append("price", inputs.price || "")
    formData.append("inStock", inputs.inStock ?? "true")
    formData.append("categories", JSON.stringify(cat))
    formData.append("gender", gender)

    formData.append("image", file)

    addProduct(formData, dispatch)

    alert("✅ Product add request sent")
    setInputs({})
    setFile(null)
    setCat([])
    setGender("unisex")
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
            placeholder="Apple Airpods"
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
          <label className="text-gray-600 font-semibold mb-2">Price ($)</label>
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
            Main Category
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
        {/* Subcategories */}
        <div className="flex flex-col w-full sm:w-[250px]">
          <label className="text-gray-600 font-semibold mb-2">
            Subcategories
          </label>
          <select
            value={cat}
            onChange={handleCat}
            className="border border-gray rounded-md p-2 focus:ring-2 focus:ring-blue-500 "
          >
            <option value="shirt">Shirt</option>
            <option value="longwear">Longwear</option>
            <option value="jackets">Jacket</option>
            <option value="casual">Casual</option>
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
