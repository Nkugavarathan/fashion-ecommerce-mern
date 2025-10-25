import React from "react"
import { motion } from "framer-motion"
import CategoryItem from "./CategoryItem"
import { categories } from "../data"
import styled from "styled-components"
import { mobile, tablet } from "../responsive"

const SubCategorySection = styled.section`
  position: relative;
  background: linear-gradient(180deg, #b3eedfff 0%, #e0f5f3 100%);
  padding: 60px 20px 80px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mobile(`padding: 40px 10px 60px;`)}
`

function SubCategory() {
  return (
    <div>
      <SubCategorySection>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-center text-teal-700 font-bold text-5xl mb-10">
            Shop by Style / Discover More
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.map((item) => (
              <CategoryItem item={item} key={item.id} />
            ))}
          </div>
        </motion.div>
      </SubCategorySection>
    </div>
  )
}

export default SubCategory
