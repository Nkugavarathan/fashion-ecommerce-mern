import React, { useEffect, useState } from "react"
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

function Products({ category, filters, sort }) {
  // console.log(category, filters, sort)
  const [products, setProdcuts] = useState([])
  const [filteredProducts, setFilterdProducts] = useState([])

  useEffect(() => {}, [category])
  return (
    <Container>
      {popularProducts.map((item) => (
        <ProductItem item={item} key={item.id} />
      ))}
    </Container>
  )
}

export default Products
