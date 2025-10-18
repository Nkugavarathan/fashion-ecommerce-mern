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
    <div className="featured">
      {/* REVENUE  */}
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>

        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      {/* SALES */}
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{totalOrders}</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Total Orders</span>
      </div>
      {/* COST */}
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            ${(income[1]?.total || 0) * 0.4} {/* example: 40% of revenue */}
          </span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Estimated Operational Cost</span>
      </div>
    </div>
  )
}
