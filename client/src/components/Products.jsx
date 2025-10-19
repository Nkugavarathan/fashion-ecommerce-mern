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
  // console.log(category, filters, sort)

  const [visibleCount, setVisibleCount] = useState(8)
  const [isExpanded, setIsExpanded] = useState(false)

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
        // console.log(res)
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
    <>
      <h2 className="text-center text-teal-600 font-bold text-xl my-4">
        Our Products
      </h2>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl px-4 justify-items-center">
          {(category ? filteredProducts : products)
            .slice(0, visibleCount)
            .map((item) => (
              <ProductItem item={item} key={item._id} />
            ))}
        </div>
      </div>

      {(category ? filteredProducts.length : products.length) > 8 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              if (isExpanded) {
                setVisibleCount(8)
                setIsExpanded(false)
                window.scrollTo({ top: 0, behavior: "smooth" })
              } else {
                setVisibleCount(
                  category ? filteredProducts.length : products.length
                )
                setIsExpanded(true)
              }
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition mb-3"
          >
            {isExpanded ? "Show Less" : "Load More"}
          </button>
        </div>
      )}
    </>
  )
}

export default Products
