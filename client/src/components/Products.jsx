import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import axios from "axios"
import ProductItem from "./ProductItem"
import { mobile, tablet } from "../responsive"

// const Container = styled.div`
//   padding: 10px;
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   position: relative;
//   background-color: "#f5f5f5";
//   ${tablet(`justify-content: center;`)}
//   ${mobile(`justify-content: center;`)};
// `

//  Offer Badge Style (rotated corner)
// const OfferBadge = styled.div`
//   position: absolute;
//   top: 0;
//   right: -70px;
//   transform: rotate(+45deg);
//   transform-origin: top left;
//   background-color: #c81818;
//   color: #fff;
//   font-size: 0.9rem;
//   font-weight: 600;
//   text-transform: uppercase;
//   padding: 6px 0;
//   width: 160px;
//   text-align: center;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
//   z-index: 10;
//   pointer-events: none;
//   overflow: hidden;
//   ${mobile(`
//     width: 120px;
//     font-size: 0.75rem;
//     padding: 4px 0;
//   `)};
// `

function Products({ category, filters, sort }) {
  const [visibleCount, setVisibleCount] = useState(8)
  const [isExpanded, setIsExpanded] = useState(false)
  const [products, setProdcuts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  // Fetch products from backend
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `http://localhost:4000/api/products?category=${category}`
            : "http://localhost:4000/api/products"
        )
        setProdcuts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getProducts()
  }, [category])

  // Filter logic
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

  // Sort logic
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

  // List of products with offers
  const offerTitles = ["Floral Maxi Dress", "Classic White Shirt"]

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <h2 className="text-center text-teal-600 font-bold text-5xl mb-10">
        Trending Now / Featured Products
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {(category ? filteredProducts : products)
              .slice(0, visibleCount)
              .map((item, index) => {
                return (
                  <div key={index} style={{ position: "relative" }}>
                    <ProductItem item={item} />
                  </div>
                )
              })}
          </div>
        </div>
      </motion.div>

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
            className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition mb-3"
          >
            {isExpanded ? "Show Less" : "Load More"}
          </button>
        </div>
      )}
    </div>
  )
}

export default Products
