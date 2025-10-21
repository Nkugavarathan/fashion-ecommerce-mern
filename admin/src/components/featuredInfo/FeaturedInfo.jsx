import React, { useState, useEffect } from "react"
import { userRequest } from "../../requestMethod.js"

export default function FeaturedInfo() {
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        //  Fetch all orders
        const ordersRes = await userRequest.get("/orders")
        setTotalOrders(ordersRes.data.length)

        // Sum all order.amount values
        const income = ordersRes.data.reduce(
          (sum, order) => sum + (Number(order.amount) || 0),
          0
        )
        setTotalIncome(income)

        //  Fetch all users
        const usersRes = await userRequest.get("/users")
        setTotalUsers(usersRes.data.length)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex gap-6 flex-wrap ms-5">
      {/*  Total Income */}
      <div className="bg-white p-5 rounded-xl shadow-md flex-1 min-w-[250px]">
        <span className="text-gray-500 text-sm">Total Income</span>
        <div className="text-2xl font-bold text-gray-800 mt-1">
          ${totalIncome.toFixed(2)}
        </div>
      </div>

      {/*  Total Orders */}
      <div className="bg-white p-5 rounded-xl shadow-md flex-1 min-w-[250px]">
        <span className="text-gray-500 text-sm">Total Orders</span>
        <div className="text-2xl font-bold text-gray-800 mt-1">
          {totalOrders}
        </div>
      </div>

      {/*  Total Users */}
      <div className="bg-white p-5 rounded-xl shadow-md flex-1 min-w-[250px]">
        <span className="text-gray-500 text-sm">Total Users</span>
        <div className="text-2xl font-bold text-gray-800 mt-1">
          {totalUsers}
        </div>
      </div>
    </div>
  )
}
