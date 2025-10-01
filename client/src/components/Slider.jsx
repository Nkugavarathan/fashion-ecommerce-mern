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
              <Image
                src="data:image/jpeg;base64,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"
                alt={item.title}
              />
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
