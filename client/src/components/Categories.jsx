import React from "react"
import styled from "styled-components"
import { mobile, tablet } from "../responsive"
import { categories } from "../data"
import CategoryItem from "./CategoryItem"
import MenCategory from "./MenCategory"
import WomenCategory from "./WomenCategory"
import SubCategory from "./SubCategory"
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

export default function CategoriesSection() {
  return (
    <div id="categories">
      <WaveSection>
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0 bg-linear-to-b from-[#b4d1cef1] via-[#009688] to-[#4DB6AC]" />

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center text-teal-700 font-bold text-5xl mb-10 mt-16 z-10 relative"
        >
          Explore by Category
        </motion.h2>

        {/* Categories */}
        <div className="relative z-10 flex flex-wrap justify-center gap-8">
          {[<MenCategory />, <WomenCategory />, <UnisexCategory />].map(
            (Component, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="w-full md:w-[350px] lg:w-[400px] h-auto p-3"
              >
                {Component}
              </motion.div>
            )
          )}
        </div>

        {/* Wave Bottom Shape */}
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

      <SubCategory />
    </div>
  )
}
