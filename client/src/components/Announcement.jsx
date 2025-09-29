import React from "react"
import styled from "styled-components"

const Container = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  background: linear-gradient(to right, teal, darkcyan);
  color: white;
  padding: 10px 0;
  letter-spacing: 1px;
  position: sticky;
  top: 0;
  z-index: 1100; /* higher than navbar */
`

function Announcement() {
  return (
    <Container>🔥 Big Offer! Free Shipping on Orders Over $50 🔥</Container>
  )
}

export default Announcement
