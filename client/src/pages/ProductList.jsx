import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Navbar from "./../components/Navbar"
import { mobile, tablet } from "../responsive"
import { useParams } from "react-router-dom"
import Newsletter from "./../components/Newsletter"
import Products from "./../components/Products"
import Footer from "./../components/Footer"

const Container = styled.div`
  padding-top: 120px;

  ${mobile(`
    padding-top: 80px;
  `)}
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile(`
    flex-direction: column;
    gap: 10px;
  `)}
`

const Filter = styled.div`
  margin: 20px;
  display: flex;
  flex-wrap: wrap;

  ${mobile(`
    flex-direction: column;
    gap: 10px;
  `)}
`

const Select = styled.select`
  margin-right: 20px;

  ${mobile(`
    margin-right: 0;
  `)}
`
const Title = styled.h1``

const FilterText = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
`

const Option = styled.option``

function ProductList() {
  const { category } = useParams()

  const [filters, setFilters] = useState([])
  const [sort, setSort] = useState("newest")
  const handleFilters = (e) => {
    const value = event.target.value
    setFilters({ ...filters, [e.target.name]: value })
  }

  useEffect(() => {
    setFilters({})
    setSort("newest")
  }, [])

  return (
    <Container>
      <Navbar />
      <Title>Dresses </Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>White</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList
