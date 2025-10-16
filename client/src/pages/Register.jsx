import React from "react"
import styled from "styled-components"

import { mobile, tablet } from "../responsive"
import { useNavigate } from "react-router-dom"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ec79c0ff;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile(`
    height: auto;
    padding: 20px 0;
  `)}
`

const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: #f5f3f3ff;

  ${tablet(`
    width: 60%;
  `)}

  ${mobile(`
    width: 90%;
  `)}
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;

  ${mobile(`
    flex-direction: column;
  `)}
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;

  ${mobile(`
    margin: 10px 0;
    min-width: 100%;
  `)}
`

const Button = styled.button`
  width: 40%;
  font-weight: 100;
  border: 2px solid teal;
  padding: 10px;
  background-color: white;
  transition: all 0.2s linear;
  margin: 20px auto 0 auto;
  &:hover {
    background-color: teal;
    color: white;
    cursor: pointer;
  }
  ${mobile(`
    width: 100%;
  `)}
`

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`

const Agreement = styled.span`
  font-size: 16px;
  margin: 20px 0;
`
const BackButton = styled.button`
  display: inline-block;
  padding: 8px 14px;
  margin: 10px auto 18px auto;
  background-color: transparent;
  color: teal;
  border: 2px solid teal;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: center;

  &:hover {
    background-color: teal;
    color: #fff;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 128, 128, 0.15);
  }

  ${mobile(`
    width: 100%;
    margin: 12px 0;
  `)}
`
function Register() {
  const navigate = useNavigate()
  return (
    <Container>
      <Wrapper>
        <Title>Create An Account</Title>
        <BackButton onClick={() => navigate("/")}>Back to Home</BackButton>

        <Form>
          <Input placeholder="firstname" />
          <Input placeholder="lastname" />
          <Input placeholder="username" />
          <Input placeholder="email" />
          <Input placeholder="password" />
          <Input placeholder="confirm password" />
          <Agreement>
            By creating an account ,I consent to the processing of my personal
            data in accordance with the <b>Privacy policy</b>
          </Agreement>
          <Button>Create Account</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register
