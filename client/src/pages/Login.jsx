import React from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ec79c0ff;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  padding: 20px;
  width: 20%;
  background-color: #f5f3f3ff;
`
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
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
`

const Link = styled.a`
  display: block;
  margin: 10px auto 5px auto;
  font-size: 14px;
  color: teal;
  text-decoration: underline;
  cursor: pointer;
`

function Login() {
  return (
    <Container>
      <Wrapper>
        <Title>Login Account</Title>
        <Form>
          <Input placeholder="username" />
          <Input placeholder="password" />
          <Button>Login</Button>
          <Link>Do not you remeber password</Link>
          <Link>Create a new Account</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login
