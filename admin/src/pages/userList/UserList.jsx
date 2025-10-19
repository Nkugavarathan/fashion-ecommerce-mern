import { useState, useEffect } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { DeleteOutline } from "@mui/icons-material"
import { userRequest } from "../../requestMethod"

export default function UserList() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await userRequest.get("/users") // fetch all users
        setData(res.data)
      } catch (err) {
        console.error("Failed to fetch users:", err)
      }
    }
    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    try {
      await userRequest.delete(`/users/${id}`) // optional: delete from DB
      setData(data.filter((item) => item._id !== id))
    } catch (err) {
      console.error("Failed to delete user:", err)
    }
  }

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full cursor-pointer mr-2"
            src={
              params.row.img ||
              "https://tse4.mm.bing.net/th/id/OIP.Kk4i-k-7bOfsgPv0SJtj5AHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
            }
            alt=""
          />
          {params.row.username}
        </div>
      ),
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "isAdmin", headerName: "Status", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center">
          <DeleteOutline
            className="text-red-600 cursor-pointer"
            onClick={() => handleDelete(params.row._id)}
          />
        </div>
      ),
    },
  ]

  return (
    <div className="flex-[4] p-4">
      <DataGrid
        rows={data}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  )
}
