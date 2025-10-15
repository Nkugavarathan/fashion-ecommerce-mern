import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import { mobile, tablet } from "../responsive"

import Footer from "../components/Footer"

import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
import { useParams } from "react-router-dom"
// import { publicRequest } from "./../requestMethod"
import axios from "axios"

const Container = styled.div``
const Wrapper = styled.div`
  margin-top: 100px;
  padding: 30px;
  display: flex;

  ${tablet(`
    flex-direction: column;
    padding: 20px;
  `)}

  ${mobile(`
    flex-direction: column;
    padding: 10px;
  `)}
`

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;

  ${tablet(`
    height: 60vh;
  `)}

  ${mobile(`
    height: 40vh;
  `)}
`

const InfoContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 0 50px;

  ${tablet(`
    padding: 20px 0;
  `)}

  ${mobile(`
    padding: 10px 0;
  `)}
`

const FilterContainer = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;

  ${mobile(`
    flex-direction: column;
    gap: 10px;
  `)}
`

const AddContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  ${mobile(`
    flex-direction: column;
    gap: 10px;
  `)}
`
const ImageContainer = styled.div`
  flex: 1;
`

const Title = styled.h1`
  font-weight: 200;
  font-size: 30px;
`
const Description = styled.p`
  margin: 20px 0;
`
const Price = styled.span`
  font-weight: 100;
  font-size: 20px;
`

const Filter = styled.div`
  display: flex;
  align-items: center;
`
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  margin-right: 10px;
`
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: ${(props) => props.color};
`
const FilterSize = styled.select``
const FilterSizeOption = styled.option``

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
`
const Amount = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`
const Button = styled.button`
  font-weight: 100;
  border: 2px solid teal;
  padding: 10px;
  background-color: white;
  transition: all 0.2s linear;
  &: hover {
    background-color: teal;
    color: white;
    cursor: pointer;
  }
`
// addto cart fetch single product while click search icon

function SingleProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState(null)
  const [size, setSize] = useState(null)
  useEffect(() => {
    const getProduct = async () => {
      try {
        // const res = await publicRequest.get(`products/find/${id}`)
        const res = await axios.get(
          `http://localhost:4000/api/products/find/${id}`
        )
        console.log("SIngle product detail", res)
        setProduct(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getProduct()
  }, [id])

  if (!product._id) return <p>Loading...</p>

  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1)
  const increaseQuantity = () => setQuantity(quantity + 1)

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImageContainer>
          <Image src={product.image} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <Price>Price Rs {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {(product.color ?? []).map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {(product.size ?? []).map((s) => (
                  <FilterSizeOption key={s}> {s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon
                style={{
                  height: 20,
                  width: 20,
                  padding: 10,
                  borderRadius: 50,
                  backgroundColor: "#ddd2d2ff",
                  cursor: "pointer",
                }}
                onClick={decreaseQuantity}
              />
              <Amount>{quantity}</Amount>
              <AddIcon
                style={{
                  height: 20,
                  width: 20,
                  padding: 10,
                  borderRadius: 50,
                  backgroundColor: "#ddd2d2ff",
                  cursor: "pointer",
                }}
                onClick={increaseQuantity}
              />
            </AmountContainer>
            <Button>Add To Cart</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default SingleProduct
