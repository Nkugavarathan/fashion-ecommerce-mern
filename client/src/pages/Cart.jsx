import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import { mobile, tablet } from "../responsive"
import axios from "axios"
import { Remove } from "@mui/icons-material"
import { Add } from "@mui/icons-material"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeProduct, updateQuantity, clearCart } from "../redux/cartRedux"
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
  border-bottom: 1px solid #eee;
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
  color: teal;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
`
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 20px;
`
const TopButton = styled.button`
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  border: 2px solid teal;
  background-color: ${(props) =>
    props.type === "filled" ? "teal" : "transparent"};
  color: ${(props) => (props.type === "filled" ? "white" : "teal")};
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.type === "filled" ? "darkcyan" : "teal"};
    color: white;
  }
`
const TopTexts = styled.div``
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
  font-size: 16px;
  color: #555;
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
const ProductName = styled.h3`
  color: #333;
  margin-bottom: 10px;
`
const ProductId = styled.span`
  color: #777;
  font-size: 14px;
  margin-bottom: 10px;
`
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color || "#ccc"};
  margin-bottom: 10px;
`
const ProductSize = styled.span`
  color: #555;
  font-weight: 500;
`
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
  color: #333;
`
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  color: teal;
`
const RemoveButton = styled.button`
  background-color: crimson;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkred;
  }
`
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 20px 0;
`
const SummaryTitle = styled.h1`
  font-weight: 200;
  color: teal;
  margin-bottom: 20px;
  text-align: center;
`
const SummaryItem = styled.div`
  margin: 25px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
  color: ${(props) => props.type === "total" && "teal"};
`
const SummaryItemText = styled.span`
  font-size: 16px;
  color: #555;
`
const SummaryItemPrice = styled.span`
  color: ${(props) => (props.type === "total" ? "teal" : "#333")};
`
const Button = styled.button`
  width: 100%;
  font-weight: 500;
  border: 2px solid teal;
  padding: 15px;
  background-color: teal;
  color: white;
  transition: all 0.3s ease;
  margin: 20px auto 0 auto;
  border-radius: 5px;
  font-size: 16px;

  &:hover {
    background-color: darkcyan;
    border-color: darkcyan;
    cursor: pointer;
    transform: translateY(-2px);
  }
`

const EmptyCart = styled.div`
  text-align: center;
  padding: 50px;
  color: #666;

  h2 {
    color: teal;
    margin-bottom: 20px;
  }
`

const OfferModal = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 2px solid teal;
  padding: 30px;
  z-index: 999;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  border-radius: 10px;
  animation: slideDown 0.6s ease-out;
  min-width: 300px;

  h3 {
    color: teal;
    margin-bottom: 10px;
  }

  p {
    color: #333;
    margin-bottom: 10px;
  }

  button {
    background: none;
    border: none;
    font-size: 18px;
    color: red;
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
  }

  @keyframes slideDown {
    from {
      transform: translate(-50%, -100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
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
  }, [stripeToken, cart.total, navigate, dispatch])

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart())
    }
  }

  //offermodal
  const [showOffer, setShowOffer] = useState(false)

  useEffect(() => {
    if (cart.total >= 0) {
      setShowOffer(true)
      const timer = setTimeout(() => setShowOffer(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [cart.total])

  const handleCloseOffer = () => setShowOffer(false)

  if (cart.products.length === 0) {
    return (
      <Container>
        <Navbar />
        {showOffer && cart.total < 10000 && (
          <OfferModal>
            <button onClick={handleCloseOffer}>×</button>
            <h3>🎉 Limited-Time Offer!</h3>
            <p>
              Get 10% off when your order exceeds Rs 10,000. Add more to unlock
              the deal!
            </p>
          </OfferModal>
        )}
        <Wrapper>
          <Title>Your Cart</Title>
          <EmptyCart>
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart to see them here.</p>
            <Link to="/">
              <TopButton type="filled" style={{ marginTop: "20px" }}>
                Continue Shopping
              </TopButton>
            </Link>
          </EmptyCart>
        </Wrapper>
        <Footer />
      </Container>
    )
  }

  return (
    <Container>
      <Navbar />

      {showOffer && cart.total >= 10000 && (
        <OfferModal>
          <button onClick={handleCloseOffer}>×</button>
          <h3>🎉 Flash Offer!</h3>
          <p>You've unlocked a 10% discount on orders above Rs 10,000.</p>
        </OfferModal>
      )}

      <Wrapper>
        <Title>Your Shopping Cart</Title>
        <Top>
          <Link to="/">
            <TopButton>Continue Shopping</TopButton>
          </Link>
          <TopTexts>
            <TopText>Your Bag ({cart.quantity} items)</TopText>
          </TopTexts>
          <TopButton
            style={{ borderColor: "red", color: "red" }}
            onClick={handleClearCart}
          >
            Clear Cart
          </TopButton>
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
                    {product.color && (
                      <>
                        <b>Color:</b>
                        <ProductColor color={product.color} />
                      </>
                    )}
                    {product.size && (
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    )}
                  </Details>
                </ProductDetails>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Remove
                      onClick={() => handleQuantity(product, "dec")}
                      style={{ cursor: "pointer", color: "teal" }}
                    />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Add
                      onClick={() => handleQuantity(product, "inc")}
                      style={{ cursor: "pointer", color: "teal" }}
                    />
                  </ProductAmountContainer>
                  <ProductPrice>
                    Rs {(product.price * product.quantity).toFixed(2)}
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
              <SummaryItemPrice>Rs {cart.total.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>

            {cart.total > 10000 ? (
              <>
                <SummaryItem>
                  <SummaryItemText>Discount (10%)</SummaryItemText>
                  <SummaryItemPrice>
                    - Rs {(cart.total * 0.1).toFixed(2)}
                  </SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Total After Discount</SummaryItemText>
                  <SummaryItemPrice>
                    Rs {(cart.total * 0.9).toFixed(2)}
                  </SummaryItemPrice>
                </SummaryItem>
              </>
            ) : (
              <SummaryItem>
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>Rs {cart.total.toFixed(2)}</SummaryItemPrice>
              </SummaryItem>
            )}

            <Link to="checkout">
              <Button>CHECKOUT NOW</Button>
            </Link>

            <Outlet />
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart
