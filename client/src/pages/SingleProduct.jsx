// import React, { useEffect, useState } from "react"
// import styled from "styled-components"
// import Navbar from "../components/Navbar"
// import Newsletter from "../components/Newsletter"
// import { mobile, tablet } from "../responsive"

// import Footer from "../components/Footer"
// import { useParams } from "react-router-dom"
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
//   height: 67.5vh;
//   object-fit: contain;
//   background-color: #f5f5f5;
//   padding: 10px;
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
//   cursor: pointer;
//   border: ${(props) => (props.selected ? "2px solid teal" : "none")};
//   transform: ${(props) => (props.selected ? "scale(1.1)" : "scale(1)")};
//   transition: all 0.2s ease;
// `
// const FilterSize = styled.select`
//   padding: 5px 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
// `
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
//   &:hover {
//     background-color: teal;
//     color: white;
//     cursor: pointer;
//   }
// `

// const LoadingContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 50vh;
//   font-size: 18px;
//   color: teal;
// `

// function SingleProduct() {
//   const { id } = useParams()
//   const [product, setProduct] = useState(null)
//   const [quantity, setQuantity] = useState(1)
//   const [color, setColor] = useState("")
//   const [size, setSize] = useState("")
//   const dispatch = useDispatch()

//   useEffect(() => {
//     const getProduct = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:4000/api/products/find/${id}`
//         )
//         console.log("Single product detail", res)
//         setProduct(res.data)
//         // Set default color and size when product loads
//         if (res.data.color && res.data.color.length > 0) {
//           setColor(res.data.color[0])
//         }
//         if (res.data.size && res.data.size.length > 0) {
//           setSize(res.data.size[0])
//         }
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getProduct()
//   }, [id])

//   const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1)
//   const increaseQuantity = () => setQuantity(quantity + 1)

//   const addToCart = () => {
//     if (!color || !size) {
//       alert("Please select color and size")
//       return
//     }
//     dispatch(addProduct({ ...product, quantity, color, size }))
//   }

//   if (!product) {
//     return (
//       <Container>
//         <Navbar />
//         <LoadingContainer>Loading...</LoadingContainer>
//       </Container>
//     )
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
//           <Price>Price Rs {product.price}</Price>

//           {/* Color Selection */}
//           <FilterContainer>
//             <Filter>
//               <FilterTitle>Color</FilterTitle>
//               {product.color &&
//                 product.color.map((c) => (
//                   <FilterColor
//                     color={c}
//                     key={c}
//                     selected={color === c}
//                     onClick={() => setColor(c)}
//                   />
//                 ))}
//             </Filter>

//             {/* Size Selection */}
//             <Filter>
//               <FilterTitle>Size</FilterTitle>
//               <FilterSize
//                 value={size}
//                 onChange={(e) => setSize(e.target.value)}
//               >
//                 {product.size &&
//                   product.size.map((s) => (
//                     <FilterSizeOption key={s} value={s}>
//                       {s}
//                     </FilterSizeOption>
//                   ))}
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
//       <Footer />
//     </Container>
//   )
// }

// export default SingleProduct

import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addProduct } from "../redux/cartRedux"

export default function SingleProduct() {
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
        setProduct(res.data)
        if (res.data.color?.length) setColor(res.data.color[0])
        if (res.data.size?.length) setSize(res.data.size[0])
      } catch (error) {
        console.log(error)
      }
    }
    getProduct()
  }, [id])

  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1)
  const increaseQuantity = () => setQuantity(quantity + 1)

  const handleAddToCart = () => {
    if (!color || !size) return alert("Please select color and size")
    dispatch(addProduct({ ...product, quantity, color, size }))
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center text-teal-600 text-xl">
          Loading...
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="mt-24 px-6 md:px-12 flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="flex-1 flex justify-center items-center bg-gray-100 p-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-[67.5vh] object-contain"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 w-full md:w-auto">
          <h1 className="text-3xl font-light mb-4">{product.title}</h1>
          <p className="mb-4 text-gray-600">{product.description}</p>
          <span className="text-2xl font-bold text-teal-700">
            Rs {product.price}
          </span>

          {/* Color & Size Selection */}
          <div className="flex flex-col md:flex-row gap-6 my-6">
            {/* Color */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-light mr-2">Color</span>
              {product.color?.map((c) => (
                <div
                  key={c}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    color === c
                      ? "border-teal-700 scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>

            {/* Size */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-light mr-2">Size</span>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
              >
                {product.size?.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-3">
              <button
                onClick={decreaseQuantity}
                className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
              >
                -
              </button>
              <span className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 border-2 border-teal-700 text-teal-700 font-medium hover:bg-teal-700 hover:text-white transition"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
