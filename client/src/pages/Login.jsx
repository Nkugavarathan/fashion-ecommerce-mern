import React, { useState } from "react"
import styled from "styled-components"
import { mobile, tablet } from "../responsive"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/apiCalls"

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
  width: 20%;
  background-color: #f5f3f3ff;

  ${tablet(`
    width: 40%;
  `)}

  ${mobile(`
    width: 80%;
  `)}
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;

  ${mobile(`
    margin: 10px 0;
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

  &:disabled {
    color: green;
    cursor: not-allowed;
  }
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

const Link = styled.a`
  display: block;
  margin: 10px auto 5px auto;
  font-size: 14px;
  color: teal;
  text-decoration: underline;
  cursor: pointer;
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

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { isFetching, error } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault() // fixed typo
    login(dispatch, { username, password })
  }

  const navigate = useNavigate()
  return (
    <Container>
      <Wrapper>
        <Title>Login Account</Title>
        <BackButton onClick={() => navigate("/")}>Back to Home</BackButton>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" disabled={isFetching}>
            {isFetching ? "Logging in..." : "Login"}
          </Button>
          <Link>Do not you remember password</Link>
          <Link>Create a new Account</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login
