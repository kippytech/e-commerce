import Container from "@/app/components/Container"
import ListRating from "@/app/components/ListRating"
import ProductDetails from "@/app/components/ProductDetails"
import { product } from "@/utils/product"

type Params = {
    productId?: string
}

function Product({ params } : { params: Params }) {
   
  return (
    <div className="p-8">
        <Container>
            <ProductDetails product={product} />
            <div className='flex flex-col gap-4 mt-20'>
                <div>Add rating</div>
                <ListRating product={product} />
            </div>
        </Container>
    </div>
  )
}

export default Product