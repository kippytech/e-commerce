import { getCurrentUser } from "@/actions/getCurrentUser";
import getProductById from "@/actions/getProductById";
import AddRating from "@/app/components/AddRating";
import Container from "@/app/components/Container";
import ListRating from "@/app/components/ListRating";
import NullData from "@/app/components/NullData";
import ProductDetails from "@/app/components/ProductDetails";
import { products } from "@/utils/products";
//import { product } from "@/utils/product"

type Params = {
  productId?: string;
};

async function Product({ params }: { params: Params }) {
  //const product: any = products.find((item) => item.id === params.productId);
  const product = await getProductById(params);
  if (!product)
    return <NullData title="Oops! Product with the given id does not exist" />;

  const user = await getCurrentUser();

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="mt-20 flex flex-col gap-4">
          <AddRating product={product} user={user} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
}

export default Product;
