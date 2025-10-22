import React from "react"
import styled from "styled-components"
import SendIcon from "@mui/icons-material/send"
import { mobile, tablet } from "../responsive"

const Container = styled.div`
  height: 40vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${mobile(`
    height: auto;
    padding: 20px;
  `)}
`

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;

  ${tablet(`
    font-size: 50px;
  `)}

  ${mobile(`
    font-size: 36px;
  `)}
`

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  background-color: white;
  border: 1px solid gray;

  ${mobile(`
    width: 90%;
    flex-direction: column;
    height: auto;
  `)}
`

const Description = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
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
      <h2 className="text-center text-teal-600 font-bold text-3xl my-4">
        Newsletter
      </h2>
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
