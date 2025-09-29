import React, { useState } from "react"
import styled from "styled-components"
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined"
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined"
import { sliderItems } from "../data"
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`

const Arrow = styled.span`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  cursor: pointer;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => (props.direction === "left" ? "10px" : "auto")};
  right: ${(props) => (props.direction === "right" ? "10px" : "auto")};
  opacity: 0.7;
  z-index: 2;
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
`

const ImgContainer = styled.div`
  flex: 1;
  padding: 50px;
`

const Image = styled.img`
  height: 80%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* vertically center */
  align-items: flex-start; /* align left side neatly */
  gap: 20px; /* spacing between items */
`

const Title = styled.h1`
  font-size: 60px;
  font-weight: bold;
  margin: 0;
`

const Desc = styled.p`
  max-width: 500px; /* keeps text in a nice box */
  font-weight: 500;
  font-size: 20px;
  line-height: 1.6;
  letter-spacing: 1px;
  margin: 0;
`

const Button = styled.button`
  padding: 12px 25px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid teal;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: teal;
    color: white;
  }
`

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(0)

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1)
    } else {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0)
    }
  }

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowBackOutlinedIcon />
      </Arrow>

      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide key={item.id}>
            <ImgContainer>
              <Image src={item.img} alt={item.title} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOP NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>

      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowForwardOutlinedIcon />
      </Arrow>
    </Container>
  )
}
