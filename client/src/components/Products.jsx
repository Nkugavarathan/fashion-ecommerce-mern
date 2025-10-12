import React, { useEffect, useState } from "react"
import styled from "styled-components"

import ProductItem from "./ProductItem"
import { mobile, tablet } from "../responsive"
import axios from "axios"

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
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `http://localhost:4000/api/products?category=${category}`
            : "http://localhost:4000/api/products"
        )
        // console.log(res)
        setProdcuts(res.data)
      } catch (error) {}
    }
    getProducts()
  }, [category])

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      )
  }, [category, filters, sort])

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      )
    } else if (sort === "asc") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price))
    } else {
      setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort])

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  )
}

export default Products
