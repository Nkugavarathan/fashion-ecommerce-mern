import { useEffect, useState } from "react"
import { userRequest } from "../../requestMethod"

export default function FeaturedInfo() {
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders")
        setTotalOrders(res.data.length)

        // ✅ Sum all order.amount values
        const income = res.data.reduce(
          (sum, order) => sum + (Number(order.amount) || 0),
          0
        )
        setTotalIncome(income)
      } catch (err) {
        console.log("Error fetching orders:", err)
      }
    }
    getOrders()
  }, [])

  return (
    <div className="flex gap-6 flex-wrap ms-5">
      <div className="bg-white p-5 rounded-xl shadow-md flex-1">
        <span className="text-gray-500 text-sm">Total Income</span>
        <div className="text-2xl font-bold text-gray-800 mt-1">
          ${totalIncome.toFixed(2)}
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-md flex-1">
        <span className="text-gray-500 text-sm">Total Orders</span>
        <div className="text-2xl font-bold text-gray-800 mt-1">
          {totalOrders}
        </div>
      </div>
    </div>
  )
}
