import React from "react"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import PinterestIcon from "@mui/icons-material/Pinterest"
import PhoneIcon from "@mui/icons-material/Phone"
import MailIcon from "@mui/icons-material/Mail"
import HomeIcon from "@mui/icons-material/Home"
import { mobile, tablet } from "../responsive"

import styled from "styled-components"
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${mobile(`
    flex-direction: column;
  `)}
`

const Left = styled.div`
  flex: 1;
  padding: 20px;

  ${mobile(`
    padding: 10px;
  `)}
`

const Center = styled.div`
  flex: 1;
  padding: 20px;

  ${mobile(`
    display: none;
  `)}
`

const Right = styled.div`
  flex: 1;
  padding: 20px;

  ${mobile(`
    background-color: #fff8f8;
  `)}
`

const Logo = styled.h1``
const Description = styled.p`
  margin: 20px 0;
`
const SocialContainer = styled.div`
  display: flex;
`

const SocialIcon = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.bgcolor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  transition: transform 0.3s ease;
  &: hover {
    color: white;
    cursor: pointer;
    transform: scale(1.2);
  }
`
const colors = {
  facebook: "#3b5998",
  instagram: "#e1306c",
  linkedin: "#0077b5",
  pinterest: "#bd081c",
}

const Title = styled.h3`
  margin-bottom: 20px;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`

const ContactItem = styled.span`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`
const Payment = styled.div`
  margin-top: 10px;
`
function Footer() {
  return (
    <Container>
      <Left>
        <Logo>VARA</Logo>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          fuga itaque minima iure ex ad facilis unde, cumque deleniti aut
          laudantium magni dolores ipsa, a dolorem, esse sint quo
          exercitationem?
        </Description>
        <SocialContainer>
          <SocialIcon bgcolor={colors.facebook}>
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon bgcolor={colors.instagram}>
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon bgcolor={colors.linkedin}>
            <LinkedInIcon />
          </SocialIcon>
          <SocialIcon bgcolor={colors.pinterest}>
            <PinterestIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Women Fashions</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <HomeIcon style={{ marginRight: "10px" }} /> No 10, HighLevel Road
          ,Nugegoda.
        </ContactItem>
        <ContactItem>
          <PhoneIcon style={{ marginRight: "10px" }} />
          +771234567
        </ContactItem>
        <ContactItem>
          <MailIcon style={{ marginRight: "10px" }} />
          contactvara@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  )
}

export default Footer
