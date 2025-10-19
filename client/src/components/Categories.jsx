import React from "react"
import { mobile, tablet } from "../responsive"
import { categories } from "../data"
import CategoryItem from "./CategoryItem"
import MenCategory from "./MenCategory"
import WomenCategory from "./WomenCategory"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 30px;

  ${tablet(`
    margin: 0 10px;
  `)}

  ${mobile(`
    flex-direction: column;
    align-items: center;
    margin: 0 5px;
  `)}
`

function Categories() {
  return (
    <>
      <h2 style={{ textAlign: "center", color: "teal", fontWeight: "bold" }}>
        Our Categories
      </h2>
      <Container className="gap-6">
        {/* Tailwind-styled special category cards */}
        <div className="w-full md:w-[480px] lg:w-[350px] p-2">
          <MenCategory />
        </div>
        <div className="w-full md:w-[480px] lg:w-[350px] p-2">
          <WomenCategory />
        </div>

        <h2 style={{ textAlign: "center", color: "teal", fontWeight: "bold" }}>
          Our SubCategories
        </h2>
        {/* Existing category items from data */}
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    </>
  )
}

export default Categories
