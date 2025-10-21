import React from "react"
import styled, { keyframes } from "styled-components"

const brands = [
  {
    name: "Gucci",
    img: "https://cdn.freebiesupply.com/logos/large/2x/gucci-1-logo-png-transparent.png",
  },
  {
    name: "Adidas",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
  },
  {
    name: "Nike",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  },
  {
    name: "Puma",
    img: "https://cdn.freebiesupply.com/logos/large/2x/puma-logo-png-transparent.png",
  },
  {
    name: "Zara",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
  },
  {
    name: "H&M",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
  },
  {
    name: "Calvin Klein",
    img: "https://cdn.freebiesupply.com/logos/large/2x/calvin-klein-logo-png-transparent.png",
  },
  {
    name: "Tommy Hilfiger",
    img: "https://cdn.freebiesupply.com/logos/large/2x/tommy-hilfiger-logo-png-transparent.png",
  },
]

//  Animation for infinite scroll
const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-40%); }
`

// ==================== Styled Components ====================

const Wrapper = styled.div`
  text-align: center;
  padding: 30px 0;
  background: #fafafa;
  min-height: 50vh;
`

const Carousel = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;
`

const Slider = styled.div`
  display: flex;
  width: calc(200%);
  animation: ${scroll} 40s linear infinite;
  will-change: transform;
`

const LogoBox = styled.div`
  flex: 0 0 auto;
  width: 160px;
  height: 90px;
  margin: 0 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: grayscale(100%) opacity(0.8);
  transition: transform 0.3s ease, filter0.3s ease;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    max-height: ;80px
  }

  &:hover {
    filter: grayscale(0%) opacity(1);
    transform: scale(1.1);
  }
`

const BrandsCarousel = () => {
  return (
    <Wrapper>
      <h2 className="text-center text-teal-600 font-bold text-6xl my-2">
        Our Brands
      </h2>
      <p className="text-center text-gray-600  text-2xl mx-auto mt-6 mb-25">
        We proudly feature products from globally trusted brands. Quality,
        style, and comfort—curated for you.
      </p>
      <Carousel>
        <Slider>
          {[...brands, ...brands].map((brand, i) => (
            <LogoBox key={i}>
              <img src={brand.img} alt={brand.name} title={brand.name} />
            </LogoBox>
          ))}
        </Slider>
      </Carousel>
    </Wrapper>
  )
}

export default BrandsCarousel
