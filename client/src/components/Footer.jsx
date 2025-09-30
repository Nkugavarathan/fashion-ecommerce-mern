import React from "react"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import PinterestIcon from "@mui/icons-material/Pinterest"
import styled from "styled-components"
const Container = styled.div`
  display: flex;
`
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
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

const Center = styled.div`
  flex: 1;
`
const Right = styled.div`
  flex: 1;
`

function Footer() {
  return (
    <Container>
      <Left>
        <Logo>JIRO</Logo>
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
      <Center></Center>
      <Right></Right>
    </Container>
  )
}

export default Footer
