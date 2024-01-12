import React from 'react'
import FormWrap from '../components/FormWrap'
import Container from '../components/Container'
import CheckoutClient from '../components/CheckoutClient'

function Checkout() {
  return (
    <div className='p-8'>
        <Container>
            <FormWrap>
                <CheckoutClient />
            </FormWrap>
        </Container>
    </div>
  )
}

export default Checkout