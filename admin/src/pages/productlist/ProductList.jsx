import "./productList.css"
import { DataGrid } from "@mui/x-data-grid"
import { DeleteOutline } from "@mui/icons-material"
// import { productRows } from "../../dummyData"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
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
        <div className="productListItem">
          <img className="productListImg" src={params.row.image} alt="" />
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
        <>
          <Link to={`/product/${params.row.id}`}>
            <button className="productListEdit">Edit</button>
          </Link>
          <DeleteOutline
            className="productListDelete"
            onClick={() => handleDelete(params.row.id)}
          />
        </>
      ),
    },
  ]

  return (
    <div className="productList">
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
