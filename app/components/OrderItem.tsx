import { formattedPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { CartProductType } from "@prisma/client";
import Image from "next/image";

type OrderItemProps = {
  item: CartProductType;
};

function OrderItem({ item }: OrderItemProps) {
  return (
    <div className="grid grid-cols-5 items-center gap-4 border-t-[1.5px] border-slate-200 py-4  text-xs md:text-sm">
      <div className="col-span-2 flex gap-2 justify-self-start md:gap-4">
        <div className="relative aspect-square w-[70px]">
          <Image
            src={item.selectedImg.image}
            alt={item.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>{truncateText(item.name)}</div>
          <div>{item.selectedImg.color}</div>
        </div>
      </div>
      <div className="justify-self-center">{formattedPrice(item.price)}</div>
      <div className="justify-self-center">{item.quantity}</div>
      <div className="justify-self-end font-semibold">
        ${(item.quantity * item.price).toFixed(2)}
      </div>
    </div>
  );
}

export default OrderItem;
