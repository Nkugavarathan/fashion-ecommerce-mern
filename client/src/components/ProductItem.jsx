import React from "react"
import styled from "styled-components"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import { mobile, tablet } from "../responsive"

import SearchIcon from "@mui/icons-material/Search"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import { Link } from "react-router-dom"
// import { useDispatch } from "react-redux"
// import { addProduct } from "../redux/cartRedux"
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.5s ease;
`

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  max-width: 320px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d1e6ed;
  position: relative;

  ${mobile(`
    width: 90%;
    height: 300px;
  `)};

  &:hover ${Info} {
    opacity: 1;
  }
`

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`

const Image = styled.img`
  height: 75%;
  z-index: 2;
`

const Icon = styled.div`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #265858ff;
    transform: scale(1.1);
  }
`
// each product
function ProductItem({ item }) {
  // const dispatch = useDispatch()
  // console.log("item", item)
  return (
    <Container>
      {/* <Circle /> */}
      <Image src={item.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlinedIcon
          // onClick={() => dispatch(addProduct({ ...item }))}
          />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`} style={{ color: "black" }}>
            <SearchIcon />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlinedIcon />{" "}
        </Icon>
      </Info>
    </Container>
  )
}

export default ProductItem
