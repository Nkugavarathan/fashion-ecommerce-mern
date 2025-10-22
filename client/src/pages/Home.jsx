import React from "react"
import Navbar from "../components/Navbar"

import Slider from "./../components/Slider"
import Categories from "./../components/Categories"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"
import Footer from "./../components/Footer"
import BrandsCarousel from "../components/BrandsCarousel"
import CustomerFeedback from "../components/customerFeedback"
import NewArrivals from "../components/NewArrivals"
import AIChatWidget from "../components/AIChatWidget"
export default function Home() {
  return (
    <div>
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <NewArrivals />
      <BrandsCarousel />
      <CustomerFeedback />
      <Newsletter />
      <AIChatWidget />
      <Footer />
    </div>
  )
}
