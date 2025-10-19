import { DataGrid } from "@mui/x-data-grid"
import { DeleteOutline } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { deleteProduct, getProducts } from "../../redux/apiCalls"
import { useDispatch, useSelector } from "react-redux"

export default function ProductList() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.products)

  useEffect(() => {
    getProducts(dispatch)
  }, [dispatch])

  const handleDelete = (id) => {
    deleteProduct(id, dispatch)
  }

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "title",
      headerName: "Product",
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full object-cover mr-2"
            src={params.row.image}
            alt=""
          />
          {params.row.title}
        </div>
      ),
    },
    { field: "inStock", headerName: "In Stock", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center">
          <Link to={`/products/${params.row.id}`}>
            <button className="bg-green-600 text-white px-3 py-1 rounded-lg mr-4 hover:bg-green-700">
              Edit
            </button>
          </Link>
          <DeleteOutline
            className="text-red-600 cursor-pointer"
            onClick={() => handleDelete(params.row.id)}
          />
        </div>
      ),
    },
  ]

  return (
    <div className="flex-[4] p-4">
      <div className="flex justify-end mb-4">
        <Link to="/newproduct">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md">
            Create New
          </button>
        </Link>
      </div>
      <DataGrid
        rows={products.map((item) => ({ id: item._id, ...item }))}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  )
}
