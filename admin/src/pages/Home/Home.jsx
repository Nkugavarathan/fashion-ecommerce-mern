import React, { useState, useEffect, useMemo } from "react"
import "./home.css"
import { userRequest } from "../../requestMethod.js"
import FeaturedInfo from "./../../components/featuredInfo/FeaturedInfo"
import Chart from "../../components/chart/Chart"
import WidgetLg from "../../components/widgeLg/WidgetLg.jsx"
import WidgetSm from "../../components/widgetSm/WidgetSm.jsx"
// import { userData } from "./../../dummydata.js"

function Home() {
  const [userStats, setUserStats] = useState([])

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  )

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats")
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        )
      } catch {}
    }
    getStats()
  }, [MONTHS])
  console.log(userStats)
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
}

export default Home
