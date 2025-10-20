// src/pages/Cart.jsx
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import { mobile, tablet } from "../responsive"
import axios from "axios"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { removeProduct, updateQuantity, clearCart } from "../redux/cartRedux"

// const KEY = import.meta.env.VITE_STRIPE_KEY
import { Link } from "react-router-dom"

// ---------- Styled Components ----------
const Container = styled.div`
  padding-top: 110px;
`
const Wrapper = styled.div`
  padding: 20px 40px;
  ${tablet(`padding: 15px 20px;`)}
  ${mobile(`padding: 10px;`)}
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  ${tablet(`flex-direction: column;`)}
  ${mobile(`flex-direction: column;`)}
`
const Product = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  ${mobile(`flex-direction: column; gap: 10px;`)}
`
const ProductImage = styled.img`
  height: 60vh;
  ${tablet(`height: 40vh;`)}
  ${mobile(`height: 30vh; object-fit: cover;`)}
`
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  ${mobile(`margin-top: 20px;`)}
`
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`
const TopButton = styled.button`
  padding: 10px;
  font-weight: 500;
  cursor: pointer;
  border: 2px solid teal;
  background-color: ${(props) =>
    props.type === "filled" ? "teal" : "transparent"};
  color: ${(props) => (props.type === "filled" ? "white" : "teal")};

  &:hover {
    background-color: ${(props) =>
      props.type === "filled" ? "darkcyan" : "#f8d7da"};
    color: ${(props) => (props.type === "filled" ? "white" : "red")};
  }
`
const TopTexts = styled.div``
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`
const Info = styled.div`
  flex: 3;
`
const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`
const Details = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const ProductName = styled.h3``
const ProductId = styled.span``
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`
const ProductSize = styled.span``
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`
const RemoveButton = styled.button`
  background-color: crimson;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: darkred;
  }
`
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`
const SummaryTitle = styled.h1`
  font-weight: 200;
`
const SummaryItem = styled.div`
  margin: 25px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span`
  font-size: 16px;
  color: #555;
`
const SummaryItemPrice = styled.span``
const Button = styled.button`
  width: 100%;
  font-weight: 100;
  border: 2px solid teal;
  padding: 10px;
  background-color: white;
  transition: all 0.2s linear;
  margin: 20px auto 0 auto;
  &:hover {
    background-color: teal;
    color: white;
    cursor: pointer;
  }
`

// ---------- MAIN COMPONENT ----------
function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const [stripeToken, setStripeToken] = useState(null)

  const onToken = (token) => {
    setStripeToken(token)
  }

  // ✅ Handle Quantity Changes
  const handleQuantity = (product, type) => {
    if (type === "dec" && product.quantity > 1) {
      dispatch(
        updateQuantity({ id: product._id, quantity: product.quantity - 1 })
      )
    } else if (type === "inc") {
      dispatch(
        updateQuantity({ id: product._id, quantity: product.quantity + 1 })
      )
    }
  }

  // ✅ Remove product from cart
  const handleRemove = (id) => {
    dispatch(removeProduct(id))
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: cart.total * 100,
          }
        )
        dispatch(clearCart())
        navigate("/success", { state: { data: res.data } })
      } catch (err) {
        console.log(err)
      }
    }
    makeRequest()
  }, [cart.total, navigate])

  const handleClearCart = () => {
    dispatch(clearCart())
  }
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <span></span>
          <TopTexts>
            <TopText>Your Bag ({cart.quantity})</TopText>
          </TopTexts>
          <div style={{ display: "flex", gap: "10px" }}>
            <TopButton
              style={{ borderColor: "red", color: "red" }}
              onClick={handleClearCart}
            >
              Clear Cart
            </TopButton>
          </div>
        </Top>

        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetails>
                  <ProductImage
                    src={
                      product.image ||
                      "https://i.pinimg.com/736x/b7/90/d7/b790d77a97a5684c0897713564d8f5c2.jpg"
                    }
                  />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetails>
                <PriceDetail>
                  <ProductAmountContainer>
                    <RemoveIcon
                      onClick={() => handleQuantity(product, "dec")}
                      style={{ cursor: "pointer" }}
                    />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <AddIcon
                      onClick={() => handleQuantity(product, "inc")}
                      style={{ cursor: "pointer" }}
                    />
                  </ProductAmountContainer>
                  <ProductPrice>
                    ${product.price * product.quantity}
                  </ProductPrice>
                  <RemoveButton onClick={() => handleRemove(product._id)}>
                    Remove
                  </RemoveButton>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>

          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>
            {/* <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$-5.90</SummaryItemPrice>
            </SummaryItem> */}
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>

            <Link to="checkout">
              <Button>CHECKOUT NOW</Button>
            </Link>

            {/* This is where CartCheckout will render */}
            <Outlet />
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart
