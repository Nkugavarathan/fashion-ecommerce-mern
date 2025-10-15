import React, { useEffect, useState } from "react"
import styled from "styled-components"

import Product from "../pages/SingleProduct"
import { mobile, tablet } from "../responsive"
import axios from "axios"

import ProductItem from "./ProductItem"
import { popularProducts } from "./../data"

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
//displays filter products
function Products({ category, filters, sort }) {
  console.log(category, filters, sort)

  const [products, setProdcuts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  // fetch products from backend according to category
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `http://localhost:4000/api/products?category=${category}`
            : "http://localhost:4000/api/products"
        )
        console.log(res)
        setProdcuts(res.data)
      } catch (error) {}
    }
    getProducts() // call fn
  }, [category])

  //  fetched data is filter
  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      )
  }, [products, category, filters, sort])

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
      {category
        ? filteredProducts.map((item) => (
            <ProductItem item={item} key={item._id} />
          ))
        : products
            .slice(0, 8)
            .map((item) => <ProductItem item={item} key={item._id} />)}

      {/* {popularProducts.map((item) => (
        <ProductItem item={item} key={item.id} />
      ))} */}
    </Container>
  )
}

export default Products
