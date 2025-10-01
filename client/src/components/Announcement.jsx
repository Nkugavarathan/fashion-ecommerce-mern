import React from "react"
import styled from "styled-components"

const Container = styled.div`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1300; /* higher than navbar */
  background: linear-gradient(to right, teal, darkcyan);
  padding: 10px 0;
  color: white;
  text-align: center;
`

function Announcement() {
  return (
    <Container>🔥 Big Offer! Free Shipping on Orders Over $50 🔥</Container>
  )
}

export default Announcement
