"use client";

import { formattedPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  data: any;
};

function ProductCard({ data }: ProductCardProps) {
  const router = useRouter();

  const productRating =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length;

  return (
    <div
      className="col-span-1 cursor-pointer rounded-sm border-[1.2px] border-slate-200 bg-slate-50 p-2 text-center text-sm transition hover:scale-105"
      onClick={() => router.push(`/product/${data.id}`)}
    >
      <div className="flex w-full flex-col items-center gap-1">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            fill
            className="h-full w-full object-contain"
            src={data.images[0].image}
            alt={data.name}
          />
        </div>
        <div className="mt-4">{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>
        <div className="font-semibold">{formattedPrice(data.price)}</div>
      </div>
    </div>
  );
}

export default ProductCard;
