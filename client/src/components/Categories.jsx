import React from "react"
import styled from "styled-components"
import { mobile, tablet } from "../responsive"
import { categories } from "../data"
import CategoryItem from "./CategoryItem"
import MenCategory from "./MenCategory"
import WomenCategory from "./WomenCategory"

import { motion } from "framer-motion"
import UnisexCategory from "./UnisexCategory"
// ---------- Styled Components ----------

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 30px;

  ${tablet(`margin: 0 10px;`)}
  ${mobile(`
    flex-direction: column;
    align-items: center;
    margin: 0 5px;
  `)}
`

const WaveSection = styled.section`
  position: relative;
  background: linear-gradient(180deg, #e0f2f1 0%, #b2dfdb 100%);
  min-height: 100vh;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mobile(`
    min-height: auto;
    padding: 60px 10px 100px;
  `)}
`

const SubCategorySection = styled.section`
  position: relative;
  background: linear-gradient(180deg, #f3f7f6 0%, #e0f5f3 100%);
  padding: 60px 20px 80px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mobile(`padding: 40px 10px 60px;`)}
`

export default function CategoriesSection() {
  return (
    <div id="categories">
      {/* === FIRST SECTION (Men / Women) === */}
      {/* <WaveSection> */}
      {/* <h2 className="text-center text-teal-700 font-bold text-5xl mb-5">
        Explore by Category
      </h2>

      <Container className="flex flex-wrap justify-center gap-8">
        {/* Men Category */}
      {/* <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.8, 0.25, 1],
            delay: 0.1,
          }}
          viewport={{ once: false, amount: 0.2 }}
          className="w-full md:w-[350px] lg:w-[400px] h-auto p-3"
        >
          <MenCategory />
        </motion.div> */}

      {/* Women Category */}
      {/* <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.8, 0.25, 1],
            delay: 0.3,
          }}
          viewport={{ once: false, amount: 0.2 }}
          className="w-full md:w-[350px] lg:w-[400px] h-auto p-3"
        >
          <WomenCategory />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.8, 0.25, 1],
            delay: 0.3,
          }}
          viewport={{ once: false, amount: 0.2 }}
          className="w-full md:w-[350px] lg:w-[400px] h-auto p-3"
        >
          <UnisexCategory />
        </motion.div>
      </Container> */}

      {/* Dark Teal Wave at the bottom */}
      {/* <svg
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 1,
          }}
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="teal-gradient" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(149, 202, 196, 1)" offset="0%" />
              <stop stopColor="rgba(8, 170, 143, 1)" offset="100%" />
            </linearGradient>
          </defs>
          <path
            fill="url(#teal-gradient)"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg> */}
      {/* </WaveSection> */}

      {/* ===(Subcategories) === */}
      <WaveSection>
        {/* Soft gradient background with subtle wave bottom */}
        <div className="absolute inset-0 z-0 bg-linear-to-b from-[#b4d1cef1] via-[#009688] to-[#4DB6AC]" />

        {/* Top Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-teal-700 font-bold text-5xl mb-10 mt-16 z-10 relative"
        >
          Explore by Category
        </motion.h2>

        {/* Category Cards */}
        <Container className="relative z-10 flex flex-wrap justify-center gap-8">
          {/* Men */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-[350px] lg:w-[400px] h-auto p-3"
          >
            <MenCategory />
          </motion.div>

          {/* Women */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-[350px] lg:w-[400px] h-auto p-3"
          >
            <WomenCategory />
          </motion.div>

          {/* Unisex */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-[350px] lg:w-[400px] h-auto p-3"
          >
            <UnisexCategory />
          </motion.div>
        </Container>

        {/* Elegant wave bottom shape */}
        <svg
          className="absolute bottom-0 left-0 w-full z-0"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#80cbc4" />
              <stop offset="100%" stopColor="#b2dfdb" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            fillOpacity="1"
            d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,138.7C672,149,768,203,864,197.3C960,192,1056,128,1152,112C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </WaveSection>

      <SubCategorySection>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="text-center text-teal-700 font-bold text-5xl mb-10">
            Shop by Style / Discover More
          </h2>

          <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.map((item) => (
              <CategoryItem item={item} key={item.id} />
            ))}
          </Container>
        </motion.div>
      </SubCategorySection>
    </div>
  )
}
