import React, { useState, useEffect } from "react"
import styled from "styled-components"
import SearchIcon from "@mui/icons-material/Search"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import Badge from "@mui/material/Badge"

const HeaderContainer = styled.div`
  width: 100%;
  position: fixed; /* fixes both Announcement + Navbar */
  top: 0;
  left: 0;
  z-index: 1200;
`

const NavbarContainer = styled.div`
  width: 100%;
  transition: all 0.3s ease;
  backdrop-filter: ${(props) => (props.scrolled ? "blur(10px)" : "none")};
  background-color: ${(props) =>
    props.scrolled ? "rgba(255, 255, 255, 0.8)" : "transparent"};
  box-shadow: ${(props) =>
    props.scrolled ? "0 2px 8px rgba(0,0,0,0.1)" : "none"};
`

const Wrapper = styled.div`
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 15px;
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
`

const Logo = styled.div`
  font-weight: bold;
  font-size: 24px;
  color: teal;
  letter-spacing: 2px;
`

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`

const MenuItem = styled.div`
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: #333;
  transition: color 0.3s ease;

  &:hover {
    color: teal;
  }
`

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <HeaderContainer>
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
            <Logo>VARA</Logo>
          </Center>
          <Right>
            <MenuItem>Home</MenuItem>
            <MenuItem>Sign In</MenuItem>
            <MenuItem>Register</MenuItem>
            <MenuItem>
              <Badge badgeContent={4} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Right>
        </Wrapper>
      </NavbarContainer>
    </HeaderContainer>
  )
}

export default Navbar
