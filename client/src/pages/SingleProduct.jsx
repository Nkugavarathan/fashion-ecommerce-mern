// import React, { useEffect, useState } from "react"
// import styled from "styled-components"
// import Navbar from "../components/Navbar"
// import Newsletter from "../components/Newsletter"
// import { mobile, tablet } from "../responsive"

// import Footer from "../components/Footer"

// // import { Remove, Add } from "@mui/icons-material"

// import { useParams } from "react-router-dom"
// // import { publicRequest } from "./../requestMethod"
// import axios from "axios"

// import { useDispatch } from "react-redux"
// import { addProduct } from "../redux/cartRedux"
// const Container = styled.div``
// const Wrapper = styled.div`
//   margin-top: 100px;
//   padding: 30px;
//   display: flex;

//   ${tablet(`
//     flex-direction: column;
//     padding: 20px;
//   `)}

//   ${mobile(`
//     flex-direction: column;
//     padding: 10px;
//   `)}
// `

// const Image = styled.img`
//   width: 100%;
//   height: 67.5vh; // 75% of 90vh
//   object-fit: contain;
//   background-color: #f5f5f5; /* Optional: adds light background behind transparent images */
//   padding: 10px; /* Optional: adds breathing room if image has different aspect ratio */

//   ${tablet(`
//     height: 45vh;
//   `)}

//   ${mobile(`
//     height: 30vh;
//   `)}
// `

// const InfoContainer = styled.div`
//   flex: 1;
//   width: 100%;
//   padding: 0 50px;

//   ${tablet(`
//     padding: 20px 0;
//   `)}

//   ${mobile(`
//     padding: 10px 0;
//   `)}
// `

// const FilterContainer = styled.div`
//   width: 100%;
//   margin: 20px 0;
//   display: flex;
//   justify-content: space-between;

//   ${mobile(`
//     flex-direction: column;
//     gap: 10px;
//   `)}
// `

// const AddContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;

//   ${mobile(`
//     flex-direction: column;
//     gap: 10px;
//   `)}
// `
// const ImageContainer = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: #f8f8f8;
// `

// const Title = styled.h1`
//   font-weight: 200;
//   font-size: 30px;
// `
// const Description = styled.p`
//   margin: 20px 0;
// `
// const Price = styled.span`
//   font-weight: 100;
//   font-size: 20px;
// `

// const Filter = styled.div`
//   display: flex;
//   align-items: center;
// `
// const FilterTitle = styled.span`
//   font-size: 20px;
//   font-weight: 200;
//   margin-right: 10px;
// `
// const FilterColor = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   margin-right: 10px;
//   background-color: ${(props) => props.color};
// `
// const FilterSize = styled.select``
// const FilterSizeOption = styled.option``

// const AmountContainer = styled.div`
//   display: flex;
//   align-items: center;
// `
// const Amount = styled.span`
//   width: 20px;
//   height: 20px;
//   border-radius: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0 5px;
// `
// // quantity
// const CircleButton = styled.button`
//   width: 35px;
//   height: 35px;
//   border-radius: 50%;
//   border: none;
//   background-color: #ddd2d2ff;
//   font-size: 20px;
//   font-weight: bold;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.2s ease;

//   &:hover {
//     background-color: #c9bfbf;
//     transform: scale(1.05);
//   }
// `

// const Button = styled.button`
//   font-weight: 100;
//   border: 2px solid teal;
//   padding: 10px;
//   background-color: white;
//   transition: all 0.2s linear;
//   &: hover {
//     background-color: teal;
//     color: white;
//     cursor: pointer;
//   }
// `
// // addto cart fetch single product while click search icon

// function SingleProduct() {
//   const { id } = useParams()
//   const [product, setProduct] = useState({})
//   const [quantity, setQuantity] = useState(1)
//   const [color, setColor] = useState(null)
//   const [size, setSize] = useState(null)
//   useEffect(() => {
//     const getProduct = async () => {
//       try {
//         // const res = await publicRequest.get(`products/find/${id}`)
//         const res = await axios.get(
//           `http://localhost:4000/api/products/find/${id}`
//         )
//         console.log("SIngle product detail", res)
//         setProduct(res.data)
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getProduct()
//   }, [id])

//   if (!product._id) return <p>Loading...</p>

//   const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1)
//   const increaseQuantity = () => setQuantity(quantity + 1)

//   const dispatch = useDispatch()

//   const addToCart = () => {
//     dispatch(addProduct({ ...product, quantity, color, size }))
//   }

//   return (
//     <Container>
//       <Navbar />
//       <Wrapper>
//         <ImageContainer>
//           <Image src={product.image} />
//         </ImageContainer>
//         <InfoContainer>
//           <Title>{product.title}</Title>
//           <Description>{product.description}</Description>
//           <Price>Price $ {product.price}</Price>
//           <FilterContainer>
//             <Filter>
//               <FilterTitle>Color</FilterTitle>
//               {product.color.map((c) => (
//                 <FilterColor color={c} key={c} onClick={() => setColor(c)} />
//               ))}
//             </Filter>
//             <Filter>
//               <FilterTitle>Size</FilterTitle>
//               <FilterSize onChange={(e) => setSize(e.target.value)}>
//                 {product.size.map((s) => (
//                   <FilterSizeOption key={s}> {s}</FilterSizeOption>
//                 ))}
//               </FilterSize>
//             </Filter>
//           </FilterContainer>
//           <AddContainer>
//             <AmountContainer>
//               <CircleButton onClick={decreaseQuantity}>-</CircleButton>

//               <Amount>{quantity}</Amount>

//               <CircleButton onClick={increaseQuantity}>+</CircleButton>
//             </AmountContainer>
//             <Button onClick={addToCart}>Add To Cart</Button>
//           </AddContainer>
//         </InfoContainer>
//       </Wrapper>
//       {/* <Newsletter /> */}
//       <Footer />
//     </Container>
//   )
// }

// export default SingleProduct

import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import { mobile, tablet } from "../responsive"

import Footer from "../components/Footer"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addProduct } from "../redux/cartRedux"

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
  height: 67.5vh;
  object-fit: contain;
  background-color: #f5f5f5;
  padding: 10px;
  ${tablet(`
    height: 45vh;
  `)}
  ${mobile(`
    height: 30vh;
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
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
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
  cursor: pointer;
  border: ${(props) => (props.selected ? "2px solid teal" : "none")};
  transform: ${(props) => (props.selected ? "scale(1.1)" : "scale(1)")};
  transition: all 0.2s ease;
`
const FilterSize = styled.select`
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`
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

const CircleButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  background-color: #ddd2d2ff;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #c9bfbf;
    transform: scale(1.05);
  }
`

const Button = styled.button`
  font-weight: 100;
  border: 2px solid teal;
  padding: 10px;
  background-color: white;
  transition: all 0.2s linear;
  &:hover {
    background-color: teal;
    color: white;
    cursor: pointer;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 18px;
  color: teal;
`

function SingleProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/products/find/${id}`
        )
        console.log("Single product detail", res)
        setProduct(res.data)
        // Set default color and size when product loads
        if (res.data.color && res.data.color.length > 0) {
          setColor(res.data.color[0])
        }
        if (res.data.size && res.data.size.length > 0) {
          setSize(res.data.size[0])
        }
      } catch (error) {
        console.log(error)
      }
    }
    getProduct()
  }, [id])

  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1)
  const increaseQuantity = () => setQuantity(quantity + 1)

  const addToCart = () => {
    if (!color || !size) {
      alert("Please select color and size")
      return
    }
    dispatch(addProduct({ ...product, quantity, color, size }))
  }

  if (!product) {
    return (
      <Container>
        <Navbar />
        <LoadingContainer>Loading...</LoadingContainer>
      </Container>
    )
  }

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

          {/* Color Selection */}
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color &&
                product.color.map((c) => (
                  <FilterColor
                    color={c}
                    key={c}
                    selected={color === c}
                    onClick={() => setColor(c)}
                  />
                ))}
            </Filter>

            {/* Size Selection */}
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                {product.size &&
                  product.size.map((s) => (
                    <FilterSizeOption key={s} value={s}>
                      {s}
                    </FilterSizeOption>
                  ))}
              </FilterSize>
            </Filter>
          </FilterContainer>

          <AddContainer>
            <AmountContainer>
              <CircleButton onClick={decreaseQuantity}>-</CircleButton>
              <Amount>{quantity}</Amount>
              <CircleButton onClick={increaseQuantity}>+</CircleButton>
            </AmountContainer>
            <Button onClick={addToCart}>Add To Cart</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default SingleProduct
