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
const Button = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #222;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`

// filter,and sort product page
function ProductList() {
  const { category } = useParams()

  //size,color
  const [filters, setFilters] = useState([])

  // newest,asc,desc
  const [sort, setSort] = useState("newest")
  const handleFilters = (e) => {
    const value = e.target.value
    //spread operator
    setFilters({ ...filters, [e.target.name]: value })
  }

  // useEffect(() => {
  //   setFilters({})
  //   setSort("newest")
  // }, [])

  const handleClearFilters = () => {
    setFilters({})
    setSort("newest")
    // Reset the dropdowns to default
    document.querySelectorAll("select").forEach((select) => {
      select.selectedIndex = 0
    })
  }

  return (
    <Container>
      <Navbar />
      <Title>{category} </Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" defaultValue="" onChange={handleFilters}>
            <Option value="" disabled>
              Color
            </Option>
            <Option>white</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" defaultValue="" onChange={handleFilters}>
            <Option value="" disabled>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
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
    </Container>
  )
}

export default ProductList
