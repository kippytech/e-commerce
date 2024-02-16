"use client";

import { Order } from "@prisma/client";
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Status from "./Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import moment from "moment";
import { formattedPrice } from "@/utils/formatPrice";
import OrderItem from "./OrderItem";

type OrderDetailsProps = {
  order: Order;
};

function OrderDetails({ order }: OrderDetailsProps) {
  //const router = useRouter();
  return (
    <div className="mx-auto flex max-w-[1150px] flex-col gap-2">
      <div className="mt-8">
        <Heading title="Order Details" />
      </div>
      <div>Order ID: {order.id}</div>
      <div>
        Total Amount:{" "}
        <span className="font-bold">{formattedPrice(order.amount)}</span>
      </div>
      <div className="flex items-center gap-2">
        <div>Payment Status:</div>
        <div>
          {order.status === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.status === "complete" ? (
            <Status
              text="completed"
              icon={MdDone}
              bg="bg-teal-200"
              color="text-teal-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div>Delivery Status:</div>
        <div>
          {order.deliveryStatus === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              text="dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              text="delivered"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>Date: {moment(order.createdAt).fromNow()}</div>
      <div>
        <h2 className="mb-2 mt-4 font-semibold">Products Ordered</h2>
        <div className="grid grid-cols-5 items-center gap-4 pb-2 text-xs">
          <div className="col-span-2 justify-self-start">PRODUCT</div>
          <div className="justify-self-center">PRICE</div>
          <div className="justify-self-center">QUANTITY</div>
          <div className="justify-self-end">TOTAL</div>
        </div>
        {order.products &&
          order.products.map((item) => <OrderItem key={item.id} item={item} />)}
      </div>
    </div>
  );
}

export default OrderDetails;
