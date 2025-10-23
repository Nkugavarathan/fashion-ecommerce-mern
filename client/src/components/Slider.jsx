import React, { useState } from "react"
import styled from "styled-components"
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined"
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined"
import { sliderItems } from "../data"
import { mobile, tablet } from "../responsive"
// import { Link } from "react-router-dom"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  background: linear-gradient(135deg, #e0f7f7, #c2e9e9, #dcfafaff);

  ${tablet(`
    height: auto;
    margin-top: 100px;
  `)}

  ${mobile(`
    height: auto;
    margin-top: 100px;
  `)}
`

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => (props.direction === "left" ? "20px" : "auto")};
  right: ${(props) => (props.direction === "right" ? "20px" : "auto")};
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  backdrop-filter: blur(6px);

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: scale(1.05);
  }
`

const Wrapper = styled.div`
  display: flex;
  transition: all 1s ease;
  height: 100%;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`

const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;

  ${tablet(`
    flex-direction: column;
    height: auto;
  `)}

  ${mobile(`
    flex-direction: column;
    height: auto;
  `)}
`

const ImgContainer = styled.div`
  flex: 1.2;
  height: 100%;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.5s ease;

  ${Slide}:hover & {
    transform: scale(1.03);
  }
`

const InfoContainer = styled.div`
  flex: 0.8;
  height: 100%;
  padding: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${tablet(`
    padding: 40px;
    align-items: center;
    text-align: center;
  `)}

  ${mobile(`
    padding: 20px;
    align-items: center;
    text-align: center;
  `)}
`

const Title = styled.h1`
  font-size: 60px;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.1;

  ${tablet(`font-size: 40px;`)}
  ${mobile(`font-size: 28px;`)}
`

const Desc = styled.p`
  max-width: 500px;
  font-size: 20px;
  color: #555;
  line-height: 1.8;
  margin-bottom: 30px;

  ${tablet(`font-size: 18px;`)}
  ${mobile(`font-size: 16px;`)}
`

const Button = styled.button`
  padding: 14px 30px;
  background-color: #008080;
  color: white;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #006666;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 128, 128, 0.3);
  }
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
              <Title className="text-teal-600">{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button as="a" href="#categories">
                Explore
              </Button>
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
