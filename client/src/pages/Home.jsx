import React from "react"
import Navbar from "../components/Navbar"

import Slider from "./../components/Slider"
import Categories from "./../components/Categories"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"
import Footer from "./../components/Footer"
import BrandsCarousel from "../components/BrandsCarousel"
import CustomerFeedback from "../components/customerFeedback"
export default function Home() {
  return (
    <div>
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <BrandsCarousel />
      <CustomerFeedback />
      <Newsletter />
      <Footer />
    </div>
  )
}
