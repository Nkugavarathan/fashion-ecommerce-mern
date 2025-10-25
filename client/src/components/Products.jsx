import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import axios from "axios"
import ProductItem from "./ProductItem"
import { mobile, tablet } from "../responsive"
import { useLocation } from "react-router-dom"
import { publicRequest, userRequest } from "../requestMethod"
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

  const location = useLocation()

  // Fetch products from backend
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          category ? `/products?category=${category}` : "/products"
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
  const cardVariants = {
    hidden: { opacity: 0, y: 40 }, // starts faded & lower
    visible: { opacity: 1, y: 0 }, // rises up and appears
  }

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* {location.pathname === "/" && (
        <h2 className="text-center text-teal-600 font-bold text-5xl mb-10">
          Trending Now / Featured Products
        </h2>
      )} */}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      > */}
      {/* <div className="flex justify-center">
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
      </div> */}
      {/* </motion.div> */}

      {/* <motion.div
        initial={{ opacity: 0, y: 50 }} // start 50px lower and invisible
        animate={{ opacity: 1, y: 0 }} // animate to original position and fully visible
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="container mx-auto px-4"
      >
        {location.pathname === "/" && (
          <h2 className="text-center text-teal-600 font-bold text-5xl mb-10">
            Trending Now / Featured Products
          </h2>
        )}

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {(category ? filteredProducts : products)
              .slice(0, visibleCount)
              .map((item, index) => (
                <div key={index} className="relative">
                  <ProductItem item={item} />
                </div>
              ))}
          </div>
        </div>
      </motion.div> */}

      <div className="container mx-auto px-4">
        {location.pathname === "/" && (
          <h2 className="text-center text-teal-600 font-bold text-5xl mb-10">
            Trending Now / Featured Products
          </h2>
        )}

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {(category ? filteredProducts : products)
              .slice(0, visibleCount)
              .map((item, index) => (
                <motion.div
                  key={index}
                  className=" "
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  variants={cardVariants}
                >
                  <ProductItem item={item} />
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      {/*  loadmore btn */}
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
