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

// // const SubCategorySection = styled.section`
// //   position: relative;
// //   background-color: #ffffff;
// //   padding: 120px 20px 60px;
// //   overflow: hidden;

// //   ${mobile(`
// //     padding: 80px 10px;
// //   `)}

// //   svg {
// //     position: absolute;
// //     top: 0;
// //     left: 0;
// //     width: 100%;
// //     transform: rotate(180deg);
// //   }
// // `

// // ---------- Component ----------

// const SubCategorySection = styled.section`
//   position: relative;
//   background: linear-gradient(to bottom, #a2d9ff 0%, #ffffff 100%);
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

//         {/* Wave at the bottom */}
//         <svg
//           id="wave"
//           style={{ transform: "rotate(0deg)", transition: "0.3s" }}
//           viewBox="0 0 1440 210"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <defs>
//             <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
//               <stop stopColor="rgba(24,241,21,1)" offset="0%" />
//               <stop stopColor="rgba(57,115,37,1)" offset="100%" />
//             </linearGradient>
//           </defs>
//           <path
//             fill="url(#sw-gradient-0)"
//             d="M0,0L40,10.5C80,21,160,42,240,45.5C320,49,400,35,480,52.5C560,70,640,119,720,143.5C800,168,880,168,960,140C1040,112,1120,56,1200,45.5C1280,35,1360,70,1440,91V210H0Z"
//           />
//         </svg>
//       </WaveSection>

//       {/* === SECOND SECTION (Subcategories) === */}
//       <SubCategorySection>
//         {/* Inverted wave at the top */}
//         <svg
//           id="wave"
//           style={{ transform: "rotate(180deg)", transition: "0.3s" }}
//           viewBox="0 0 1440 210"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <defs>
//             <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
//               <stop stopColor="rgba(243,106,62,1)" offset="0%" />
//               <stop stopColor="rgba(234,211,8,1)" offset="100%" />
//             </linearGradient>
//           </defs>
//           <path
//             fill="url(#sw-gradient-1)"
//             d="M0,0L40,10.5C80,21,160,42,240,45.5C320,49,400,35,480,52.5C560,70,640,119,720,143.5C800,168,880,168,960,140C1040,112,1120,56,1200,45.5C1280,35,1360,70,1440,91V210H0Z"
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

import React from "react"
import styled from "styled-components"
import { mobile, tablet } from "../responsive"
import { categories } from "../data"
import CategoryItem from "./CategoryItem"
import MenCategory from "./MenCategory"
import WomenCategory from "./WomenCategory"

// ---------- Styled Components ----------

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 30px;
  z-index: 1000;

  ${tablet(`
    margin: 0 10px;
  `)}

  ${mobile(`
    flex-direction: column;
    align-items: center;
    margin: 0 5px;
  `)}
`

const WaveSection = styled.section`
  position: relative;
  background-color: #b0e3ff; /* light sky blue */
  height: 100vh;
  padding: 60px 20px 100px;
  overflow: hidden;

  ${mobile(`
    height: auto;
    padding-bottom: 80px;
  `)}

  svg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
`

const SubCategorySection = styled.section`
  position: relative;
  background-color: #e0f5f3; /* soft teal background to match btn */
  padding: 120px 20px 60px;
  overflow: hidden;

  ${mobile(`
    padding: 80px 10px;
  `)}

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: rotate(180deg);
  }
`

// ---------- Component ----------

export default function Categories() {
  return (
    <div id="categories">
      {/* === FIRST SECTION (Men / Women) === */}
      <WaveSection>
        <h2 className="text-center text-white font-bold text-3xl mb-10">
          Our Categories
        </h2>

        <Container className="flex flex-wrap justify-center gap-10 mb-10">
          <div className="w-full md:w-[500px] lg:w-[600px] h-[600px] p-4">
            <MenCategory />
          </div>
          <div className="w-full md:w-[500px] lg:w-[600px] h-[600px] p-4">
            <WomenCategory />
          </div>
        </Container>

        {/* Wave at the bottom */}
        <svg
          id="wave"
          style={{ transform: "rotate(0deg)", transition: "0.3s" }}
          viewBox="0 0 1440 350"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(35,180,180,1)" offset="0%" />{" "}
              {/* teal tone */}
              <stop stopColor="rgba(58,200,160,1)" offset="100%" />
            </linearGradient>
          </defs>
          <path
            style={{ transform: "translate(0, 0px)", opacity: 1 }}
            fill="url(#sw-gradient-0)"
            d="M0,0L40,17.5C80,35,160,70,240,75.8C320,82,400,58,480,87.5C560,117,640,198,720,239.2C800,280,880,280,960,233.3C1040,187,1120,93,1200,75.8C1280,58,1360,117,1440,151.7V350H0Z"
          />
        </svg>
      </WaveSection>

      {/* === SECOND SECTION (Subcategories) === */}
      <SubCategorySection>
        {/* Inverted wave at the top */}
        <svg
          id="wave"
          style={{ transform: "rotate(180deg)", transition: "0.3s" }}
          viewBox="0 0 1440 350"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(35,180,180,1)" offset="0%" />
              <stop stopColor="rgba(58,200,160,1)" offset="100%" />
            </linearGradient>
          </defs>
          <path
            style={{ transform: "translate(0, 50px)", opacity: 0.95 }}
            fill="url(#sw-gradient-1)"
            d="M0,210L40,215.8C80,222,160,233,240,215.8C320,198,400,152,480,110.8C560,70,640,35,720,46.7C800,58,880,117,960,145.8C1040,175,1120,175,1200,145.8C1280,117,1360,58,1440,70V350H0Z"
          />
        </svg>

        <h2 className="text-center text-white font-bold text-4xl ">
          Our SubCategories
        </h2>

        <Container className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((item) => (
            <CategoryItem item={item} key={item.id} />
          ))}
        </Container>
      </SubCategorySection>
    </div>
  )
}
