import React from "react"

import { styled } from "styled-components"
import Navbar from "./../components/Navbar"

import Footer from "./../components/Footer"
import Announcement from "./../components/Announcement"

const Container = styled.div`
  padding-top: 110px;
`
const Wrapper = styled.div``
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`
const Top = styled.div`
  display: flex;
  justify-content: space-between;
`
const TopButton = styled.button``
const Bottom = styled.div``

function Cart() {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Cart</Title>
        <Top>
          <TopButton>Countinue Shopping</TopButton>
          <TopButton>Checkout Now</TopButton>
        </Top>
        <Bottom></Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart
