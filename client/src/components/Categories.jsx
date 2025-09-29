import React from "react"

import { categories } from "../data"
import CategoryItem from "./CategoryItem"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 30px;
  flex: 1;
`

function Categories() {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} />
      ))}
    </Container>
  )
}

export default Categories
