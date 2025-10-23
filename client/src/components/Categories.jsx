// import React from "react"
// import styled from "styled-components"
// import { categories } from "../data"
// import { mobile, tablet } from "../responsive"
// import CategoryItem from "./CategoryItem"
// import MenCategory from "./MenCategory"
// import WomenCategory from "./WomenCategory"

// // ---------- Styled Components ----------

// const Container = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   margin: 0 30px;
//   z-index: 10;

//   ${tablet(`
//     margin: 0 10px;
//   `)}

//   ${mobile(`
//     flex-direction: column;
//     align-items: center;
//     margin: 0 5px;
//   `)}
// `

// const WaveSection = styled.section`
//   position: relative;
//   background-color: #a2d9ff;
//   height: 100vh;
//   padding: 60px 20px 100px;
//   overflow: hidden;

//   ${mobile(`
//     height: auto;
//     padding-bottom: 80px;
//   `)}

//   svg {
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     width: 100%;
//   }
// `

// const SubCategorySection = styled.section`
//   position: relative;
//   background-color: #ffffff;
//   padding: 120px 20px 60px;
//   overflow: hidden;

//   ${mobile(`
//     padding: 80px 10px;
//   `)}

//   svg {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     transform: rotate(180deg);
//   }
// `

// // ---------- Component ----------

// export default function Categories() {
//   return (
//     <div id="categories">
//       {/* === FIRST SECTION (Men / Women) === */}
//       <WaveSection>
//         <h2 className="text-center text-white font-bold text-2xl mb-6">
//           Our Categories
//         </h2>

//         <Container className="flex flex-wrap justify-center gap-6 mb-10">
//           <div className="w-full md:w-[480px] lg:w-[350px] p-2">
//             <MenCategory />
//           </div>
//           <div className="w-full md:w-[480px] lg:w-[350px] p-2">
//             <WomenCategory />
//           </div>
//         </Container>

//         {/* === Bottom Wave (Your new SVG) === */}
//         <svg
//           style={{ transform: "rotate(0deg)", transition: "0.3s" }}
//           viewBox="0 0 1440 350"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <defs>
//             <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
//               <stop stopColor="rgba(24,241,21,1)" offset="0%" />
//               <stop stopColor="rgba(57,115,37,1)" offset="100%" />
//             </linearGradient>
//             <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
//               <stop stopColor="rgba(243,106,62,1)" offset="0%" />
//               <stop stopColor="rgba(234,211,8,1)" offset="100%" />
//             </linearGradient>
//           </defs>

//           <path
//             fill="url(#sw-gradient-0)"
//             d="M0,0L40,17.5C80,35,160,70,240,75.8C320,82,400,58,480,87.5C560,117,640,198,720,239.2C800,280,880,280,960,233.3C1040,187,1120,93,1200,75.8C1280,58,1360,117,1440,151.7V350H0Z"
//           />
//           <path
//             fill="url(#sw-gradient-1)"
//             opacity="0.9"
//             transform="translate(0, 50)"
//             d="M0,210L40,215.8C80,222,160,233,240,215.8C320,198,400,152,480,110.8C560,70,640,35,720,46.7C800,58,880,117,960,145.8C1040,175,1120,175,1200,145.8C1280,117,1360,58,1440,70V350H0Z"
//           />
//         </svg>
//       </WaveSection>

//       {/* === SECOND SECTION (Subcategories) === */}
//       <SubCategorySection>
//         {/* === Top Wave (rotated version of your SVG) === */}
//         <svg
//           style={{ transform: "rotate(180deg)", transition: "0.3s" }}
//           viewBox="0 0 1440 350"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <defs>
//             <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
//               <stop stopColor="rgba(24,241,21,1)" offset="0%" />
//               <stop stopColor="rgba(57,115,37,1)" offset="100%" />
//             </linearGradient>
//             <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
//               <stop stopColor="rgba(243,106,62,1)" offset="0%" />
//               <stop stopColor="rgba(234,211,8,1)" offset="100%" />
//             </linearGradient>
//           </defs>

//           <path
//             fill="url(#sw-gradient-0)"
//             d="M0,0L40,17.5C80,35,160,70,240,75.8C320,82,400,58,480,87.5C560,117,640,198,720,239.2C800,280,880,280,960,233.3C1040,187,1120,93,1200,75.8C1280,58,1360,117,1440,151.7V350H0Z"
//           />
//           <path
//             fill="url(#sw-gradient-1)"
//             opacity="0.9"
//             transform="translate(0, 50)"
//             d="M0,210L40,215.8C80,222,160,233,240,215.8C320,198,400,152,480,110.8C560,70,640,35,720,46.7C800,58,880,117,960,145.8C1040,175,1120,175,1200,145.8C1280,117,1360,58,1440,70V350H0Z"
//           />
//         </svg>

//         <h2 className="text-center text-teal-600 font-bold text-2xl mb-6">
//           Our SubCategories
//         </h2>

//         <Container className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {categories.map((item) => (
//             <CategoryItem item={item} key={item.id} />
//           ))}
//         </Container>
//       </SubCategorySection>
//     </div>
//   )
// }

// import React from "react"
// import styled from "styled-components"
// import { mobile, tablet } from "../responsive"
// import { categories } from "../data"
// import CategoryItem from "./CategoryItem"
// import MenCategory from "./MenCategory"
// import WomenCategory from "./WomenCategory"

// // ---------- Styled Components ----------

// const Container = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   margin: 0 30px;
//   z-index: 1000;

//   ${tablet(`
//     margin: 0 10px;
//   `)}

//   ${mobile(`
//     flex-direction: column;
//     align-items: center;
//     margin: 0 5px;
//   `)}
// `

// const WaveSection = styled.section`
//   position: relative;
//   background-color: #b0e3ff; /* light sky blue */
//   height: 100vh;
//   padding: 60px 20px 100px;
//   overflow: hidden;

//   ${mobile(`
//     height: auto;
//     padding-bottom: 80px;
//   `)}

//   svg {
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     width: 100%;
//   }
// `

// const SubCategorySection = styled.section`
//   position: relative;
//   background-color: #e0f5f3; /* soft teal background to match btn */
//   padding: 120px 20px 60px;
//   overflow: hidden;

//   ${mobile(`
//     padding: 80px 10px;
//   `)}

//   svg {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     transform: rotate(180deg);
//   }
// `

// // ---------- Component ----------

// export default function Categories() {
//   return (
//     <div id="categories">
//       {/* === FIRST SECTION (Men / Women) === */}
//       <WaveSection>
//         <h2 className="text-center text-white font-bold text-3xl mb-10">
//           Our Categories
//         </h2>

//         <Container className="flex flex-wrap justify-center gap-10 mb-10">
//           <div className="w-full md:w-[500px] lg:w-[600px] h-[600px] p-4">
//             <MenCategory />
//           </div>
//           <div className="w-full md:w-[500px] lg:w-[600px] h-[600px] p-4">
//             <WomenCategory />
//           </div>
//         </Container>

//         {/* Wave at the bottom */}
//         <svg
//           id="wave"
//           style={{ transform: "rotate(0deg)", transition: "0.3s" }}
//           viewBox="0 0 1440 350"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <defs>
//             <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
//               <stop stopColor="rgba(35,180,180,1)" offset="0%" />{" "}
//               {/* teal tone */}
//               <stop stopColor="rgba(58,200,160,1)" offset="100%" />
//             </linearGradient>
//           </defs>
//           <path
//             style={{ transform: "translate(0, 0px)", opacity: 1 }}
//             fill="url(#sw-gradient-0)"
//             d="M0,0L40,17.5C80,35,160,70,240,75.8C320,82,400,58,480,87.5C560,117,640,198,720,239.2C800,280,880,280,960,233.3C1040,187,1120,93,1200,75.8C1280,58,1360,117,1440,151.7V350H0Z"
//           />
//         </svg>
//       </WaveSection>

//       {/* === SECOND SECTION (Subcategories) === */}
//       <SubCategorySection>
//         {/* Inverted wave at the top */}
//         <svg
//           id="wave"
//           style={{ transform: "rotate(180deg)", transition: "0.3s" }}
//           viewBox="0 0 1440 350"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <defs>
//             <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
//               <stop stopColor="rgba(35,180,180,1)" offset="0%" />
//               <stop stopColor="rgba(58,200,160,1)" offset="100%" />
//             </linearGradient>
//           </defs>
//           <path
//             style={{ transform: "translate(0, 50px)", opacity: 0.95 }}
//             fill="url(#sw-gradient-1)"
//             d="M0,210L40,215.8C80,222,160,233,240,215.8C320,198,400,152,480,110.8C560,70,640,35,720,46.7C800,58,880,117,960,145.8C1040,175,1120,175,1200,145.8C1280,117,1360,58,1440,70V350H0Z"
//           />
//         </svg>

//         <h2 className="text-center text-white font-bold text-4xl ">
//           Our SubCategories
//         </h2>

//         <Container className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {categories.map((item) => (
//             <CategoryItem item={item} key={item.id} />
//           ))}
//         </Container>
//       </SubCategorySection>
//     </div>
//   )
// }

// import React from "react"
// import styled from "styled-components"
// import { mobile, tablet } from "../responsive"
// import { categories } from "../data"
// import CategoryItem from "./CategoryItem"
// import MenCategory from "./MenCategory"
// import WomenCategory from "./WomenCategory"

// // ---------- Styled Components ----------

// const Container = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   margin: 0 30px;
//   position: "relative";
//   zindex: 2;
//   ${tablet(`margin: 0 10px;`)}
//   ${mobile(`
//     flex-direction: column;
//     align-items: center;
//     margin: 0 5px;
//   `)}
// `

// const WaveSection = styled.section`
//   position: "absolute";
//   zindex: 1;
//   bottom: 0;
//   left: 0;
//   background: linear-gradient(180deg, #b0e3ff 0%, #eaf7ff 100%);
//   min-height: 100vh;
//   padding: 80px 20px;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   ${mobile(`
//     min-height: auto;
//     padding: 60px 10px 100px;
//   `)}

//   svg {
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     width: 100%;
//   }
// `

// const SubCategorySection = styled.section`
//   position: relative;
//   background: linear-gradient(180deg, #f3f7f6 0%, #e0f5f3 100%);
//   padding: 140px 20px 100px;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   ${mobile(`padding: 100px 10px 80px;`)}
// `

// /*svg {
//   //   position: absolute;
//   //   top: 0;
//   //   left: 0;
//   //   width: 100%;
//   //   transform: rotate(180deg);
//   // } */
// // ---------- Component ----------

// export default function Categories() {
//   return (
//     <div id="categories">
//       {/* === FIRST SECTION (Men / Women) === */}
//       <WaveSection>
//         <h2 className="text-center text-teal-600 font-bold text-5xl mb-12 ">
//           Our Categories
//         </h2>

//         <Container className="flex flex-wrap justify-center gap-8">
//           <div className="w-full md:w-[450px] lg:w-[500px] h-auto p-3">
//             <MenCategory />
//           </div>
//           <div className="w-full md:w-[450px] lg:w-[500px] h-auto p-3">
//             <WomenCategory />
//           </div>
//         </Container>

//         {/* Wave at the bottom */}
//         <svg viewBox="0 0 1440 350" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
//               <stop stopColor="rgba(35,180,180,1)" offset="0%" />
//               <stop stopColor="rgba(58,200,160,1)" offset="100%" />
//             </linearGradient>
//           </defs>
//           <path
//             fill="url(#sw-gradient-0)"
//             d="M0,0L40,17.5C80,35,160,70,240,75.8C320,82,400,58,480,87.5C560,117,640,198,720,239.2C800,280,880,280,960,233.3C1040,187,1120,93,1200,75.8C1280,58,1360,117,1440,151.7V350H0Z"
//           />
//         </svg>
//       </WaveSection>

//       {/* === SECOND SECTION (Subcategories) === */}
//       <SubCategorySection>
//         {/* Inverted wave at the top */}
//         <svg viewBox="0 0 144 1350" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
//               <stop stopColor="rgba(35,180,180,1)" offset="0%" />
//               <stop stopColor="rgba(58,200,160,1)" offset="100%" />
//             </linearGradient>
//           </defs>
//           <path
//             fill="url(#sw-gradient-1)"
//             style={{ transform: "translate(0, 40px)", opacity: 0.9 }}
//             d="M0,210L40,215.8C80,222,160,233,240,215.8C320,198,400,152,480,110.8C560,70,640,35,720,46.7C800,58,880,117,960,145.8C1040,175,1120,175,1200,145.8C1280,117,1360,58,1440,70V350H0Z"
//           />
//         </svg>

//         <h2 className="relative z-20 text-center text-teal-500 my-10 font-bold text-5xl ">
//           Our Subcategories
//         </h2>

//         <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
//           {categories.map((item) => (
//             <CategoryItem item={item} key={item.id} />
//           ))}
//         </Container>
//       </SubCategorySection>
//     </div>
//   )
// }

// import React from "react"
// import styled from "styled-components"
// import { mobile, tablet } from "../responsive"
// import { categories } from "../data"
// import CategoryItem from "./CategoryItem"
// import MenCategory from "./MenCategory"
// import WomenCategory from "./WomenCategory"

// // ---------- Styled Components ----------

// const Container = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   margin: 0 30px;

//   ${tablet(`margin: 0 10px;`)}
//   ${mobile(`
//     flex-direction: column;
//     align-items: center;
//     margin: 0 5px;
//   `)}
// `

// const WaveSection = styled.section`
//   position: relative;
//   background: linear-gradient(180deg, #b0e3ff 0%, #eaf7ff 100%);
//   min-height: 100vh;
//   padding: 80px 20px;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   ${mobile(`
//     min-height: auto;
//     padding: 60px 10px 100px;
//   `)}
// `

// const WaveBackground = styled.div`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   height: 30%;
//   z-index: 1;

//   svg {
//     width: 100%;
//     height: 100%;
//   }
// `

// const ContentWrapper = styled.div`
//   position: relative;
//   z-index: 2;
//   width: 100%;
// `

// const SubCategorySection = styled.section`
//   position: relative;
//   background: linear-gradient(180deg, #f3f7f6 0%, #e0f5f3 100%);
//   padding: 140px 20px 100px;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   ${mobile(`padding: 100px 10px 80px;`)}
// `

// const TopWaveBackground = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 30%;
//   z-index: 1;

//   svg {
//     width: 100%;
//     height: 100%;
//     transform: rotate(180deg);
//   }
// `

// // ---------- Component ----------

// export default function Categories() {
//   return (
//     <div id="categories">
//       {/* === FIRST SECTION (Men / Women) === */}
//       <WaveSection>
//         {/* Wave at the bottom - BEHIND content */}
//         <WaveBackground>
//           <svg viewBox="0 0 1440 350" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
//                 <stop stopColor="rgba(35,180,180,1)" offset="0%" />
//                 <stop stopColor="rgba(58,200,160,1)" offset="100%" />
//               </linearGradient>
//             </defs>
//             <path
//               fill="url(#sw-gradient-0)"
//               d="M0,0L40,17.5C80,35,160,70,240,75.8C320,82,400,58,480,87.5C560,117,640,198,720,239.2C800,280,880,280,960,233.3C1040,187,1120,93,1200,75.8C1280,58,1360,117,1440,151.7V350H0Z"
//             />
//           </svg>
//         </WaveBackground>

//         {/* Content - IN FRONT of wave */}
//         <ContentWrapper>
//           <h2 className="text-center text-teal-600 font-bold text-5xl mb-12">
//             Our Categories
//           </h2>

//           <Container className="flex flex-wrap justify-center gap-8">
//             <div className="w-full md:w-[450px] lg:w-[500px] h-auto p-3">
//               <MenCategory />
//             </div>
//             <div className="w-full md:w-[450px] lg:w-[500px] h-auto p-3">
//               <WomenCategory />
//             </div>
//           </Container>
//         </ContentWrapper>
//       </WaveSection>

//       {/* === SECOND SECTION (Subcategories) === */}
//       <SubCategorySection>
//         {/* Inverted wave at the top - BEHIND content */}
//         <TopWaveBackground>
//           <svg viewBox="0 0 1440 350" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
//                 <stop stopColor="rgba(35,180,180,1)" offset="0%" />
//                 <stop stopColor="rgba(58,200,160,1)" offset="100%" />
//               </linearGradient>
//             </defs>
//             <path
//               fill="url(#sw-gradient-1)"
//               d="M0,210L40,215.8C80,222,160,233,240,215.8C320,198,400,152,480,110.8C560,70,640,35,720,46.7C800,58,880,117,960,145.8C1040,175,1120,175,1200,145.8C1280,117,1360,58,1440,70V350H0Z"
//             />
//           </svg>
//         </TopWaveBackground>

//         {/* Content - IN FRONT of wave */}
//         <ContentWrapper>
//           <h2 className="text-center text-teal-500 my-10 font-bold text-5xl">
//             Our Subcategories
//           </h2>

//           <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
//             {categories.map((item) => (
//               <CategoryItem item={item} key={item.id} />
//             ))}
//           </Container>
//         </ContentWrapper>
//       </SubCategorySection>
//     </div>
//   )
// }

import React from "react"
import styled from "styled-components"
import { mobile, tablet } from "../responsive"
import { categories } from "../data"
import CategoryItem from "./CategoryItem"
import MenCategory from "./MenCategory"
import WomenCategory from "./WomenCategory"
import { motion } from "framer-motion"
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

// ---------- Component ----------

export default function Categories() {
  return (
    <div id="categories">
      {/* === FIRST SECTION (Men / Women) === */}
      <WaveSection>
        <h2 className="text-center text-teal-700 font-bold text-5xl mb-5">
          Our Categories
        </h2>

        <Container className="flex flex-wrap justify-center gap-8">
          <div className="w-full md:w-[450px] lg:w-[500px] h-auto p-3">
            <MenCategory />
          </div>
          <div className="w-full md:w-[450px] lg:w-[500px] h-auto p-3">
            <WomenCategory />
          </div>
        </Container>

        {/* Dark Teal Wave at the bottom */}
        <svg
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
              <stop stopColor="rgba(0,105,92,1)" offset="0%" />
              <stop stopColor="rgba(0,77,64,1)" offset="100%" />
            </linearGradient>
          </defs>
          <path
            fill="url(#teal-gradient)"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </WaveSection>

      {/* ===(Subcategories) === */}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <SubCategorySection>
          <h2 className="text-center text-teal-700 font-bold text-5xl mb-10">
            Our Subcategories
          </h2>

          <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.map((item) => (
              <CategoryItem item={item} key={item.id} />
            ))}
          </Container>
        </SubCategorySection>
      </motion.div>
    </div>
  )
}
