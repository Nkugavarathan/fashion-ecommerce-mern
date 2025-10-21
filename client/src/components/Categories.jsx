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
const WaveSection = styled.section`
  position: relative;
  background-color: #a2d9ff;
  height: 70vh;
  padding-top: 40px;
  overflow: hidden;

  ${mobile(`
    height: auto;
    padding-bottom: 60px;
  `)}

  svg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
`


function Categories() {
  return (
    <div id="categories">
      <h2 className="text-center text-teal-600 font-bold text-xl my-4">
        Our Categories
      </h2>

      {/* Main Categories Row */}
      <Container className="flex flex-wrap justify-center gap-6 mb-10">
        <div className="w-full md:w-[480px] lg:w-[350px] p-2">
          <MenCategory />
        </div>
        <div className="w-full md:w-[480px] lg:w-[350px] p-2">
          <WomenCategory />
        </div>
      </Container>

      <h2 className="text-center text-teal-600 font-bold text-xl my-4">
        Our SubCategories
      </h2>

      {/* Subcategories Row */}
      <Container className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    </div>
  )
}

export default Categories
