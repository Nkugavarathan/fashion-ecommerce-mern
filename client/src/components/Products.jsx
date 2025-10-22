// import React, { useEffect, useState } from "react"
// import styled from "styled-components"
// import { motion } from "framer-motion"
// import Product from "../pages/SingleProduct"
// import { mobile, tablet } from "../responsive"
// import axios from "axios"

// import ProductItem from "./ProductItem"
// // import { popularProducts } from "./../data"

// const Container = styled.div`
//   padding: 10px;
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;

//   ${tablet(`
//     justify-content: center;
//   `)}

//   ${mobile(`
//     justify-content: center;
//   `)}
// `
// //displays filter products
// function Products({ category, filters, sort }) {
//   // console.log(category, filters, sort)

//   const [visibleCount, setVisibleCount] = useState(8)
//   const [isExpanded, setIsExpanded] = useState(false)

//   const [products, setProdcuts] = useState([])
//   const [filteredProducts, setFilteredProducts] = useState([])

//   // fetch products from backend according to category
//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const res = await axios.get(
//           category
//             ? `http://localhost:4000/api/products?category=${category}`
//             : "http://localhost:4000/api/products"
//         )
//         // console.log(res)
//         setProdcuts(res.data)
//       } catch (error) {}
//     }
//     getProducts() // call fn
//   }, [category])

//   //  fetched data is filter
//   useEffect(() => {
//     category &&
//       setFilteredProducts(
//         products.filter((item) =>
//           Object.entries(filters).every(([key, value]) =>
//             item[key].includes(value)
//           )
//         )
//       )
//   }, [products, category, filters, sort])

//   useEffect(() => {
//     if (sort === "newest") {
//       setFilteredProducts((prev) =>
//         [...prev].sort((a, b) => a.createdAt - b.createdAt)
//       )
//     } else if (sort === "asc") {
//       setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price))
//     } else {
//       setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price))
//     }
//   }, [sort])

//   return (
//     <div style={{ backgroundColor: "#f5f5f5" }}>
//       <h2 className="text-center text-teal-600 font-bold text-5xl mb-10 ">
//         Our Products
//       </h2>
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         <div className="flex justify-center">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ...">
//             {(category ? filteredProducts : products)
//               .slice(0, visibleCount)
//               .map((item, index) => (
//                 <ProductItem item={item} key={index} />
//               ))}
//           </div>
//         </div>
//       </motion.div>
//       {(category ? filteredProducts.length : products.length) > 8 && (
//         <div className="flex justify-center mt-6">
//           <button
//             onClick={() => {
//               if (isExpanded) {
//                 setVisibleCount(8)
//                 setIsExpanded(false)
//                 window.scrollTo({ top: 0, behavior: "smooth" })
//               } else {
//                 setVisibleCount(
//                   category ? filteredProducts.length : products.length
//                 )
//                 setIsExpanded(true)
//               }
//             }}
//             className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition mb-3"
//           >
//             {isExpanded ? "Show Less" : "Load More"}
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Products



import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import axios from "axios"
import ProductItem from "./ProductItem"
import { mobile, tablet } from "../responsive"

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  ${tablet(`justify-content: center;`)}
  ${mobile(`justify-content: center;`)}
`

// 🌟 Offer Badge Style (rotated corner)
const OfferBadge = styled.div`
  background-color: #c81818;
  width: 130px;
  color: #ece5e5;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 500;
  position: absolute;
  text-align: center;
  top: 30px;
  left: 150px;
  transform: rotate(45deg);
  box-shadow: 0 -6px 7px rgba(75, 30, 30, 0.9);
  z-index: 10;
  overflow:hidden;

  ${mobile(`
    width: 100px;
    font-size: 0.8rem;
    top: 20px;
    left: 100px;
  `)}
`


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
  const offerTitles = ["Floral Maxi Dress", "Blue Check Shirt"]

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <h2 className="text-center text-teal-600 font-bold text-5xl mb-10">
        Our Products
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
                const hasOffer = offerTitles.includes(item.title)
                return (
                  <div key={index} style={{ position: "relative" }}>
                    {hasOffer && <OfferBadge>10% OFF</OfferBadge>}
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
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition mb-3"
          >
            {isExpanded ? "Show Less" : "Load More"}
          </button>
        </div>
      )}
    </div>
  )
}

export default Products
