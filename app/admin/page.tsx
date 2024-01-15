import React from 'react'
import Summary from '../components/Summary'
import getOrders from '@/actions/getOrders'
import getProducts from '@/actions/getProducts'
import getUsers from '@/actions/getUsers'
import Container from '../components/Container'
import BarGraph from '../components/BarGraph'
import getGraph from '@/actions/getGraph'

async function Admin() {

  const products = await getProducts({category: null})
  const orders = await getOrders()
  const users = await getUsers()

  const graphData = await getGraph()

  return (
    <div className='pt-8'>
      <Container>
        <Summary products={products} orders={orders} users={users} />
        <div className='mt-4 mx-auto max-w-[1150px]'>
          <BarGraph graphData={graphData} />
        </div>
      </Container>
    </div>
  )
}

export default Admin