import React, { useState, useEffect } from "react"
import "./featuredinfo.css"
import { ArrowDownward, ArrowUpward } from "@mui/icons-material"
import { userRequest } from "../../requestMethod.js"
export default function FeaturedInfo() {
  const [income, setIncome] = useState([])
  const [perc, setPerc] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)

  // Get monthly income
  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/orders/income")
        setIncome(res.data)
        if (res.data.length >= 2) {
          setPerc((res.data[1].total * 100) / res.data[0].total - 100)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getIncome()
  }, [])

  // Get total number of sales/orders
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders")
        setTotalOrders(res.data.length)
        console.log("Income data:" + res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getOrders()
  }, [])
  return (
    <div className="flex flex-wrap gap-4 justify-between w-full">
      {/* REVENUE */}
      <div className="flex-1 min-w-[280px] bg-white p-4 rounded shadow">
        <span className="text-lg font-semibold block mb-2">Revenue</span>
        <div className="flex items-center justify-between mb-1">
          <span className="text-2xl font-bold text-gray-800">
            ${income[1]?.total}
          </span>
          <span className="flex items-center text-sm text-gray-600">
            %{Math.floor(perc)}
            {perc < 0 ? (
              <ArrowDownward className="text-red-500 ml-1" />
            ) : (
              <ArrowUpward className="text-green-500 ml-1" />
            )}
          </span>
        </div>
        <span className="text-xs text-gray-500">Compared to last month</span>
      </div>

      {/* SALES */}
      <div className="flex-1 min-w-[280px] bg-white p-4 rounded shadow">
        <span className="text-lg font-semibold block mb-2">Sales</span>
        <div className="flex items-center justify-between mb-1">
          <span className="text-2xl font-bold text-gray-800">
            {totalOrders}
          </span>
          <span className="flex items-center text-sm text-gray-600">
            +2.4 <ArrowUpward className="text-green-500 ml-1" />
          </span>
        </div>
        <span className="text-xs text-gray-500">Total Orders</span>
      </div>

      {/* COST */}
      <div className="flex-1 min-w-[280px] bg-white p-4 rounded shadow">
        <span className="text-lg font-semibold block mb-2">Cost</span>
        <div className="flex items-center justify-between mb-1">
          <span className="text-2xl font-bold text-gray-800">
            ${(income[1]?.total || 0) * 0.4}
          </span>
          <span className="flex items-center text-sm text-gray-600">
            -1.4 <ArrowDownward className="text-red-500 ml-1" />
          </span>
        </div>
        <span className="text-xs text-gray-500">
          Estimated Operational Cost
        </span>
      </div>
    </div>
  )
}
