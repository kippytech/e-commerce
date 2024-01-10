import React from 'react'
import Container from '../components/Container'
import FormWrap from '../components/FormWrap'
import LoginForm from '../components/LoginForm'

export default function Login() {
  return (
    <Container>
        <FormWrap>
            <LoginForm />
        </FormWrap>
    </Container>
  )
}
