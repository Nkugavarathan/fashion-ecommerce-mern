import { DataGrid } from "@mui/x-data-grid"
import { DeleteOutline } from "@mui/icons-material"
import { userRows } from "../../dummydata.js"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function UserList() {
  const [data, setData] = useState(userRows)

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id))
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full cursor-pointer mr-2"
            src={params.row.avatar}
            alt=""
          />
          {params.row.username}
        </div>
      ),
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "transaction", headerName: "Transaction Volume", width: 160 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center">
          <Link to={`/users/${params.row.userId}`}>
            <button className="bg-green-600 text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-green-700 mr-4">
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
        <Link to="/newUser">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md">
            Create New
          </button>
        </Link>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  )
}
