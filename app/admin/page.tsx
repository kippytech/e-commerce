import Summary from "../components/Summary";
import getOrders from "@/actions/getOrders";
import getProducts from "@/actions/getProducts";
import getUsers from "@/actions/getUsers";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import BarGraph from "../components/BarGraph";
import getGraph from "@/actions/getGraph";
import NullData from "../components/NullData";

async function Admin() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access Denied" />;
  }

  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();

  const graphData = await getGraph();

  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} users={users} />
        <div className="mx-auto mt-4 max-w-[1150px]">
          <BarGraph graphData={graphData} />
        </div>
      </Container>
    </div>
  );
}

export default Admin;
