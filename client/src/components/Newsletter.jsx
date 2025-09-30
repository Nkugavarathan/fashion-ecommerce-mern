import React from "react"
import styled from "styled-components"
import SendIcon from "@mui/icons-material/send"

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`
const Description = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  background-color: white;
  border: 1px solid gray;
`
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`

function Newsletter() {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Got timely updated from your favourite products</Description>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  )
}

export default Newsletter
