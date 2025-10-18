import { Link } from "react-router-dom"
import { Publish } from "@mui/icons-material"
import Chart from "../../components/chart/Chart"
import { productData } from "../../dummyData"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { updateProduct } from "../../redux/apiCalls"
export default function Product() {
  const { productId } = useParams()
  const product = useSelector((state) =>
    state.product.products.find((item) => item._id === productId)
  )
  console.log(product)

  const handleUpdate = (e) => {
    e.preventDefault()
    const updatedProduct = {
      ...product,
      title: e.target.title.value,
      inStock: e.target.inStock.value === "yes",
    }
    updateProduct(productId, updatedProduct, dispatch)
  }
  return (
    <div className="flex-[4] p-6">
      {/* Title Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product</h1>
        <Link to="/newproduct">
          <button className="bg-teal-600 hover:bg-teal-700 text-white text-base px-4 py-2 rounded-md">
            Create
          </button>
        </Link>
      </div>

      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left - Chart */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </div>

        {/* Right - Product Info */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          {/* <div className="flex items-center mb-4">
            <img
              src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <span className="text-lg font-semibold">Apple Airpods</span>
          </div> */}

          {/* <div className="space-y-2">
            <div className="flex justify-between w-40 text-gray-700">
              <span className="font-medium">ID:</span>
              <span className="font-light">123</span>
            </div>
            <div className="flex justify-between w-40 text-gray-700">
              <span className="font-medium">Sales:</span>
              <span className="font-light">5123</span>
            </div>
            <div className="flex justify-between w-40 text-gray-700">
              <span className="font-medium">Active:</span>
              <span className="font-light">Yes</span>
            </div>
            <div className="flex justify-between w-40 text-gray-700">
              <span className="font-medium">In Stock:</span>
              <span className="font-light">No</span>
            </div>
          </div> */}

          <div className="flex items-center mb-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <span className="text-lg font-semibold">{product.title}</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between w-40 text-gray-700">
              <span className="font-medium">ID:</span>
              <span className="font-light">{product._id}</span>
            </div>
            <div className="flex justify-between w-40 text-gray-700">
              <span className="font-medium">Price:</span>
              <span className="font-light">{product.price}</span>
            </div>
            <div className="flex justify-between w-40 text-gray-700">
              <span className="font-medium">In Stock:</span>
              <span className="font-light">
                {product.inStock ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <form className="flex flex-col lg:flex-row justify-between gap-6">
          {/* Left Form */}
          <div className="flex flex-col flex-1">
            <label className="text-gray-600 font-semibold mb-2">
              Product Name
            </label>
            <input
              type="text"
              defaultValue={product.title}
              className="border-b border-gray-300 outline-none mb-4 p-2 focus:border-blue-500"
            />

            <label className="text-gray-600 font-semibold mb-2">In Stock</label>
            <select
              name="inStock"
              id="inStock"
              defaultValue={product.inStock ? "yes" : "no"}
              className="border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-500"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <label className="text-gray-600 font-semibold mb-2">Active</label>
            <select
              name="active"
              id="active"
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Right Form */}
          <div className="flex flex-col flex-1 justify-around">
            <div className="flex items-center mb-4">
              <img
                src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="w-24 h-24 rounded-lg object-cover mr-4"
              />
              <label htmlFor="file" className="cursor-pointer text-blue-600">
                <Publish />
              </label>
              <input type="file" id="file" className="hidden" />
            </div>

            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-6 rounded-md transition-all duration-200"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
