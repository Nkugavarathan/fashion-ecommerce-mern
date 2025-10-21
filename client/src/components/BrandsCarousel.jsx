import React from "react"
import styled, { keyframes } from "styled-components"

// 10 popular clothing brand logos (you can replace links if needed)
const brands = [
  {
    name: "Gucci",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Gucci_Logo.svg",
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
    img: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Puma_Logo.svg",
  },
  {
    name: "Levis",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Levis_logo.svg",
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
    img: "https://upload.wikimedia.org/wikipedia/commons/1/15/Calvin_klein_logo.svg",
  },
  {
    name: "Tommy Hilfiger",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Tommy_Hilfiger_Logo.svg",
  },
  {
    name: "Louis Vuitton",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Louis_Vuitton_logo_and_wordmark.svg",
  },
]

//  Animation for infinite scroll
const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`

// ==================== Styled Components ====================

const Wrapper = styled.div`
  text-align: center;
  padding: 40px 0;
  background: #fafafa;
  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 24px;
  }
`

const Carousel = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;
`

const Slider = styled.div`
  display: flex;
  width: calc(200%);
  animation: ${scroll} 25s linear infinite;
`

const LogoBox = styled.div`
  flex: 0 0 auto;
  width: 150px;
  height: 80px;
  margin: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: grayscale(100%) opacity(0.8);
  transition: all 0.3s ease;

  img {
    width: 100px;
    height: auto;
    object-fit: contain;
  }

  &:hover {
    filter: grayscale(0%) opacity(1);
    transform: scale(1.1);
  }
`

const BrandsCarousel = () => {
  return (
    <Wrapper>
      <h2 className="text-center text-teal-600 font-bold text-xl my-4">
        Our Brands
      </h2>
      <Carousel>
        <Slider>
          {brands.concat(brands).map((brand, index) => (
            <LogoBox key={index}>
              <img src={brand.img} alt={brand.name} title={brand.name} />
            </LogoBox>
          ))}
        </Slider>
      </Carousel>
    </Wrapper>
  )
}

export default BrandsCarousel
