import getOrderById from "@/actions/getOrderById"
import Container from "@/app/components/Container"
import ListRating from "@/app/components/ListRating"
import NullData from "@/app/components/NullData"
import OrderDetails from "@/app/components/OrderDetails"

type IParams = {
    orderId?: string
}

async function Order({ params } : { params: IParams }) {
    const order = await getOrderById(params)

    if (!order) return <NullData title="No orders. Order a Product from our store today!" />
   
  return (
    <div className="p-8">
        <Container>
            <OrderDetails order={order} />
        </Container>
    </div>
  )
}

export default Order