import React, { useState } from "react"
import styled from "styled-components"
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined"
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined"
import { sliderItems } from "../data"
import { mobile, tablet } from "../responsive"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;

  ${tablet(`
    margin-top:100px;

    height: auto;
  `)}

  ${mobile(`
    margin-top:100px;
    height: auto;
  `)}
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

  ${tablet(`
    flex-direction: column;
    height: auto;
    padding: 20px 0;
  `)}

  ${mobile(`
    flex-direction: column;
    height: auto;
    padding: 20px 0;
  `)}
`

const ImgContainer = styled.div`
  flex: 1;
  padding: 50px;

  ${tablet(`
    padding: 20px;
  `)}

  ${mobile(`
    padding: 10px;
  `)}
`

const Image = styled.img`
  height: 80%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;

  ${tablet(`
    height: auto;
    max-height: 300px;
  `)}

  ${mobile(`
    height: auto;
    max-height: 250px;
  `)}
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;

  ${tablet(`
    padding: 20px;
    align-items: center;
    text-align: center;
  `)}

  ${mobile(`
    padding: 15px;
    align-items: center;
    text-align: center;
  `)}
`

const Title = styled.h1`
  font-size: 60px;
  font-weight: bold;
  margin: 0;

  ${tablet(`
    font-size: 40px;
  `)}

  ${mobile(`
    font-size: 28px;
  `)}
`

const Desc = styled.p`
  max-width: 500px;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.6;
  letter-spacing: 1px;
  margin: 0;

  ${tablet(`
    font-size: 18px;
  `)}

  ${mobile(`
    font-size: 16px;
  `)}
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

  ${mobile(`
    font-size: 16px;
    padding: 10px 20px;
  `)}
`

function Slider() {
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
              <Image src={item.image} alt={item.title} />
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

export default Slider
