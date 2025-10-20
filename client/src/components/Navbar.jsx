// import React, { useState, useEffect } from "react"
// import styled from "styled-components"
// import SearchIcon from "@mui/icons-material/Search"
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
// import MenuIcon from "@mui/icons-material/Menu"
// import CloseIcon from "@mui/icons-material/Close"
// import Badge from "@mui/material/Badge"
// import { mobile, tablet } from "../responsive"
// import { useSelector } from "react-redux"
// import { Link } from "react-router-dom"

// //  top: ${(props) => (props.isHome ? "40px" : 0)};

// const Container = styled.div`
//   width: 100%;
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: 1100;
// `

// const NavbarContainer = styled.div`
//   width: 100%;
//   transition: all 0.3s ease;
//   backdrop-filter: ${(props) => (props.scrolled ? "blur(10px)" : "none")};
//   background-color: ${(props) =>
//     props.scrolled ? "rgba(255, 255, 255, 0.8)" : "#e4e4e4ff"};
//   box-shadow: ${(props) =>
//     props.scrolled ? "0 2px 4px rgba(0,0,0,0.1)" : "none"};
// `

// const Wrapper = styled.div`
//   padding: 15px 40px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   position: relative;
//   ${tablet(`
//     padding: 10px 20px;
//   `)} ${mobile(`
//     padding: 8px 15px;
//   `)};
// `
// const WrapperOne = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   ${tablet(`
//     padding: 10px 20px;
//     flex-direction: row;
//     justify-content: space-between;
//   `)}

//   ${mobile(`
//     padding: 8px 15px;
//     flex-direction: row;
//     justify-content: space-between;
//   `)}
// `

// const Left = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   gap: 15px;

//   ${tablet(`
//     display: none;
//   `)}
// `

// const Language = styled.div`
//   font-size: 14px;
//   cursor: pointer;
//   font-weight: 500;
//   color: #333;
// `

// const SearchContainer = styled.div`
//   border: 1px solid lightgray;
//   display: flex;
//   align-items: center;
//   padding: 5px 10px;
//   border-radius: 20px;
// `

// const Input = styled.input`
//   border: none;
//   outline: none;
//   font-size: 14px;
//   margin-right: 5px;
//   background-color: transparent;
// `

// const Center = styled.div`
//   flex: 1;
//   text-align: center;

//   padding: 15px 40px;

//   ${tablet(`
//    postion:absolute;
//    top:0;
//    left:0;
//   `)}

//   ${mobile(`
//     postion:absolute;
//    top:0;
//    left:0;
//   `)}
// `

// const Logo = styled.div`
//   font-weight: bold;
//   font-size: 24px;
//   color: teal;
//   letter-spacing: 2px;

//   ${tablet(`
//     font-size: 20px;
//   `)}

//   ${mobile(`
//     font-size: 18px;
//   `)}
// `

// const Right = styled.div`
//   flex: 1;
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   gap: 20px;

//   ${tablet(`
//     display: none;
//   `)}
// `

// const MobileMenuIcon = styled.div`
//   display: none;

//   ${tablet(`
//     display: block;
//     cursor: pointer;
//   `)}
// `

// const MobileMenu = styled.div`
//   position: absolute;
//   top: 100%;
//   right: 0;
//   background-color: white;
//   width: 100%;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   display: ${(props) => (props.open ? "flex" : "none")};
//   flex-direction: column;
//   align-items: center;
//   padding: 20px 0;
//   z-index: 1000;
// `

// const MenuItem = styled(Link)`
//   cursor: pointer;
//   font-size: 15px;
//   font-weight: 500;
//   color: #333;
//   padding: 10px 0;
//   transition: color 0.3s ease;
//   text-decoration: none;
//   display: inline-flex;
//   align-items: center;

//   &:hover {
//     color: teal;
//   }
// `

// function Navbar({ isHome }) {
//   const [scrolled, setScrolled] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 0)
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const quantity = useSelector((state) => state.cart.quantity)

//   return (
//     <Container isHome={isHome}>
//       <NavbarContainer scrolled={scrolled}>
//         <Wrapper>
//           <Left>
//             <Language>EN</Language>
//             <SearchContainer>
//               <Input placeholder="Search" />
//               <SearchIcon style={{ fontSize: 20, color: "gray" }} />
//             </SearchContainer>
//           </Left>
//           <Center>
//             <WrapperOne>
//               <Logo>VARA</Logo>
//               <MobileMenuIcon onClick={() => setMenuOpen(!menuOpen)}>
//                 {menuOpen ? <CloseIcon /> : <MenuIcon />}
//               </MobileMenuIcon>
//             </WrapperOne>
//           </Center>
//           <Right>
//             <MenuItem to="/">Home</MenuItem>
//             <MenuItem to="/login">Login</MenuItem>
//             <MenuItem to="/register">Register</MenuItem>
//             <MenuItem to="/cart">
//               <Badge badgeContent={quantity} color="primary">
//                 <ShoppingCartOutlinedIcon />
//               </Badge>
//             </MenuItem>
//           </Right>
//         </Wrapper>
//         <MobileMenu open={menuOpen}>
//           <SearchContainer>
//             <Input placeholder="Search" />
//             <SearchIcon style={{ fontSize: 20, color: "gray" }} />
//           </SearchContainer>
//           <MenuItem to="/" onClick={() => setMenuOpen(false)}>
//             Home
//           </MenuItem>
//           <MenuItem to="/login" onClick={() => setMenuOpen(false)}>
//             Sign In
//           </MenuItem>
//           {/* <MenuItem to="/register" onClick={() => setMenuOpen(false)}>
//             Register
//           </MenuItem> */}
//           <MenuItem to="/cart" onClick={() => setMenuOpen(false)}>
//             <Badge badgeContent={quantity} color="primary">
//               <ShoppingCartOutlinedIcon />
//             </Badge>
//           </MenuItem>
//         </MobileMenu>
//       </NavbarContainer>
//     </Container>
//   )
// }

// export default Navbar

import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import SearchIcon from "@mui/icons-material/Search"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import Badge from "@mui/material/Badge"
import { mobile, tablet } from "../responsive"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout as logoutAction } from "../redux/userRedux"

// ...existing styled components...
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

// New account UI styles
const AccountContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`

const AvatarButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
`

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
`

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  min-width: 150px;
  z-index: 1200;
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`

const DropdownItem = styled.button`
  background: transparent;
  border: none;
  text-align: left;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  width: 100%;

  &:hover {
    background: #f5f5f5;
  }
`

function Navbar({ isHome }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [acctOpen, setAcctOpen] = useState(false)
  const acctRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Redux user state (null if not logged in)
  const currentUser = useSelector((state) => state.user.currentUser)
  const quantity = useSelector((state) => state.cart.quantity)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Close account dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (acctRef.current && !acctRef.current.contains(e.target)) {
        setAcctOpen(false)
      }
    }
    document.addEventListener("click", onDocClick)
    return () => document.removeEventListener("click", onDocClick)
  }, [])

  const handleProfile = () => {
    setAcctOpen(false)
    navigate("/profile")
  }

  const handleLogout = () => {
    // clear client-side stored token / user info
    try {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      // if you use persisted redux, also clear that key (adjust if different)
      // localStorage.removeItem("persist:root")
    } catch (err) {
      // ignore storage errors
    }
    dispatch(logoutAction()) // clear redux state
    setAcctOpen(false)
    navigate("/")
  }

  const avatarSrc =
    currentUser?.image ||
    currentUser?.profileImage ||
    "https://i.pravatar.cc/150?img=3" // default avatar

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

            {/* Show account UI only when user is logged in */}
            {currentUser ? (
              <AccountContainer ref={acctRef}>
                <AvatarButton
                  aria-label="My account"
                  onClick={(e) => {
                    e.stopPropagation()
                    setAcctOpen((v) => !v)
                  }}
                >
                  <Avatar
                    src={avatarSrc}
                    alt={currentUser.username || "User"}
                  />
                </AvatarButton>

                {acctOpen && (
                  <Dropdown>
                    <DropdownItem onClick={handleProfile}>Profile</DropdownItem>
                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                  </Dropdown>
                )}
              </AccountContainer>
            ) : (
              <>
                <MenuItem to="/login">Login</MenuItem>
                {/* <MenuItem to="/register">Register</MenuItem> */}
              </>
            )}

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

          {currentUser ? (
            <>
              <MenuItem to="/profile" onClick={() => setMenuOpen(false)}>
                My Account
              </MenuItem>
              <MenuItem
                as="button"
                onClick={() => {
                  handleLogout()
                  setMenuOpen(false)
                }}
              >
                Logout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem to="/login" onClick={() => setMenuOpen(false)}>
                Sign In
              </MenuItem>
              {/* <MenuItem to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </MenuItem> */}
            </>
          )}

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
