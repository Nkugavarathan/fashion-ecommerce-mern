import React from "react"
import styled from "styled-components"
import Navbar from "./../components/Navbar"

import Newsletter from "./../components/Newsletter"
import Products from "./../components/Products"
import Footer from "./../components/Footer"
const Container = styled.div`
  padding-top: 120px;
`
const Title = styled.h1``

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Filter = styled.div`
  margin: 20px;
  display: flex;
`
const FilterText = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
`
const Select = styled.select`
  margin-right: 20px;
`
const Option = styled.option``

function ProductList() {
  return (
    <Container>
      <Navbar />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select>
            <Option disabled selected>
              Color
            </Option>
            <Option>White</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select>
            <Option selected>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList
