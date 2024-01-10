import React from 'react'
import Container from '../components/Container'
import CartClient from '../components/CartClient'

function Cart() {
  return (
    <div className='pt-8'>
      <Container>
        <CartClient />
      </Container>
    </div>
  )
}

export default Cart