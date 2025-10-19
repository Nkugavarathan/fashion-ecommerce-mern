import React, { useState, useEffect } from "react"
import styled from "styled-components"
import SearchIcon from "@mui/icons-material/Search"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import Badge from "@mui/material/Badge"
import { mobile, tablet } from "../responsive"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

//  top: ${(props) => (props.isHome ? "40px" : 0)};

const Container = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1100;
`

const NavbarContainer = styled.div`
  width: 100%;
  transition: all 0.3s ease;
  backdrop-filter: ${(props) => (props.scrolled ? "blur(10px)" : "none")};
  background-color: ${(props) =>
    props.scrolled ? "rgba(255, 255, 255, 0.8)" : "#e4e4e4ff"};
  box-shadow: ${(props) =>
    props.scrolled ? "0 2px 4px rgba(0,0,0,0.1)" : "none"};
`

const Wrapper = styled.div`
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  ${tablet(`
    padding: 10px 20px;
  `)} ${mobile(`
    padding: 8px 15px;
  `)};
`
const WrapperOne = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${tablet(`
    padding: 10px 20px;
    flex-direction: row;
    justify-content: space-between;
  `)}

  ${mobile(`
    padding: 8px 15px;
    flex-direction: row;
    justify-content: space-between;
  `)}
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 15px;

  ${tablet(`
    display: none;
  `)}
`

const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  color: #333;
`

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 20px;
`

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  margin-right: 5px;
  background-color: transparent;
`

const Center = styled.div`
  flex: 1;
  text-align: center;

  padding: 15px 40px;

  ${tablet(`
   postion:absolute;
   top:0;
   left:0;
  `)}

  ${mobile(`
    postion:absolute;
   top:0;
   left:0;
  `)}
`

const Logo = styled.div`
  font-weight: bold;
  font-size: 24px;
  color: teal;
  letter-spacing: 2px;

  ${tablet(`
    font-size: 20px;
  `)}

  ${mobile(`
    font-size: 18px;
  `)}
`

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;

  ${tablet(`
    display: none;
  `)}
`

const MobileMenuIcon = styled.div`
  display: none;

  ${tablet(`
    display: block;
    cursor: pointer;
  `)}
`

const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  z-index: 1000;
`

const MenuItem = styled(Link)`
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: #333;
  padding: 10px 0;
  transition: color 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;

  &:hover {
    color: teal;
  }
`

function Navbar({ isHome }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const quantity = useSelector((state) => state.cart.quantity)

  return (
    <Container isHome={isHome}>
      <NavbarContainer scrolled={scrolled}>
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input placeholder="Search" />
              <SearchIcon style={{ fontSize: 20, color: "gray" }} />
            </SearchContainer>
          </Left>
          <Center>
            <WrapperOne>
              <Logo>VARA</Logo>
              <MobileMenuIcon onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </MobileMenuIcon>
            </WrapperOne>
          </Center>
          <Right>
            <MenuItem to="/">Home</MenuItem>
            <MenuItem to="/login">Login</MenuItem>
            <MenuItem to="/register">Register</MenuItem>
            <MenuItem to="/cart">
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Right>
        </Wrapper>
        <MobileMenu open={menuOpen}>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ fontSize: 20, color: "gray" }} />
          </SearchContainer>
          <MenuItem to="/" onClick={() => setMenuOpen(false)}>
            Home
          </MenuItem>
          <MenuItem to="/login" onClick={() => setMenuOpen(false)}>
            Sign In
          </MenuItem>
          <MenuItem to="/register" onClick={() => setMenuOpen(false)}>
            Register
          </MenuItem>
          <MenuItem to="/cart" onClick={() => setMenuOpen(false)}>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </MenuItem>
        </MobileMenu>
      </NavbarContainer>
    </Container>
  )
}

export default Navbar
