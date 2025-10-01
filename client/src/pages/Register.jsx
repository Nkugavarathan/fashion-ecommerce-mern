import React from "react"
import styled from "styled-components"

import { mobile, tablet } from "../responsive"

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

function Register() {
  return (
    <Container>
      <Wrapper>
        <Title>Create An Account</Title>
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
