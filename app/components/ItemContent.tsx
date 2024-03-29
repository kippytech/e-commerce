"use client";

import { formattedPrice } from "@/utils/formatPrice";
import { CartProductType } from "./ProductDetails";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import SetQuantity from "./products/SetQuantity";
import { useCart } from "@/hooks/useCart";

type ItemContentPropType = {
  item: CartProductType;
};

function ItemContent({ item }: ItemContentPropType) {
  const {
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useCart();
  return (
    <div className="grid grid-cols-5 items-center gap-4 border-t-[1.5px] border-slate-200 py-4 text-xs md:text-sm">
      <div className="col-span-2 flex gap-2 justify-self-start md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative aspect-square h-[70px] max-w-[70px]">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className="w-[70px]">
            <button
              className="text-slate-500 underline"
              onClick={() => {
                handleRemoveProductFromCart(item);
              }}
            >
              Remove
            </button>
          </div>
          <div />
        </div>
      </div>
      <div className="justify-self-center">{formattedPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter
          cartProduct={item}
          handleQtyIncrease={() => {
            handleCartQtyIncrease(item);
          }}
          handleQtyDecrease={() => {
            handleCartQtyDecrease(item);
          }}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formattedPrice(item.price * item.quantity)}
      </div>
    </div>
  );
}

export default ItemContent;
