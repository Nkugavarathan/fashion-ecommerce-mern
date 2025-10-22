import React from "react"
import styled from "styled-components"
import { mobile, tablet } from "../responsive"
import { Link } from "react-router-dom"
const Container = styled.div`
  flex: 1;
  margin: 10px;
  height: 300px;
  min-width: 280px;
  max-width: 400px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  ${mobile(`
    width: 90%;
    height: 250px;
  `)}
`

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.3);
`

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: bold;
  border-radius: 10px;

  &: hover {
    transition: background-color 0.2s linear;
    background-color: teal;
    color: white;
  }
`
// const WaveSection = styled.section`
//   position: relative;
//   background-color: #b0e3ff; /* light sky blue */
//   height: 60vh;
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

function CategoryItem({ item }) {
  return (
    <Container>
      <Link to={`/products/${item.category}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  )
}

export default CategoryItem
