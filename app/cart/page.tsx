import React from 'react'
import Container from '../components/Container'
import CartClient from '../components/CartClient'
import { getCurrentUser } from '@/actions/getCurrentUser'

async function Cart() {
  const currentUser = await getCurrentUser()
  return (
    <div className='pt-8'>
      <Container>
        <CartClient currentUser={currentUser}/>
      </Container>
    </div>
  )
}

export default Cart