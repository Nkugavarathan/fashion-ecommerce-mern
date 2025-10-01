import React from "react"
import styled from "styled-components"
import { popularProducts } from "../data"
import ProductItem from "./ProductItem"
import { mobile, tablet } from "../responsive"

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  ${tablet(`
    justify-content: center;
  `)}

  ${mobile(`
    justify-content: center;
  `)}
`

function Products() {
  return (
    <Container>
      {popularProducts.map((item) => (
        <ProductItem item={item} key={item.id} />
      ))}
    </Container>
  )
}

export default Products
