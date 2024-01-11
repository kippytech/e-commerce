import React from 'react'
import Container from '../components/Container'
import FormWrap from '../components/FormWrap'
import LoginForm from '../components/LoginForm'
import { getCurrentUser } from '@/actions/getCurrentUser'

export default async function Login() {
  const currentUser = await getCurrentUser()
  return (
    <Container>
        <FormWrap>
            <LoginForm currentUser={currentUser} />
        </FormWrap>
    </Container>
  )
}
