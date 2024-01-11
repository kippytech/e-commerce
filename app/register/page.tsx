import React from 'react'
import Container from '../components/Container'
import FormWrap from '../components/FormWrap'
import RegisterForm from '../components/RegisterForm'
import { getCurrentUser } from '@/actions/getCurrentUser'

async function page() {
  const currentUser = await getCurrentUser()
  return (
    <Container>
        <FormWrap>
            <RegisterForm currentUser={currentUser} />
        </FormWrap>
    </Container>
  )
}

export default page