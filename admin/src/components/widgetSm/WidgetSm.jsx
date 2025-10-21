import { useState, useEffect } from "react"
// import "./widgetSm.css"
// import { Visibility } from "@mui/icons-material"
import { userRequest } from "../../requestMethod"

export default function WidgetSm() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/users/?new=true")
        setUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [])

  return (
    <div className="bg-white p-4 rounded shadow w-full sm:w-1/2 lg:w-1/3 ms-5">
      <h3 className="text-lg font-semibold mb-4">New Join Members</h3>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user._id} className="flex items-center justify-between">
            <img
              src={
                user.image ||
                "https://tse4.mm.bing.net/th/id/OIP.Kk4i-k-7bOfsgPv0SJtj5AHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
              }
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="flex-1 ml-4 text-sm font-medium">
              {user.username}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
