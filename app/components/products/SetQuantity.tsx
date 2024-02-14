"use client";

import { CartProductType } from "../ProductDetails";

type SetQtyProps = {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
};

function SetQuantity({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}: SetQtyProps) {
  return (
    <div className="flex items-center gap-8">
      {cartCounter ? null : <div className="font-semibold">QUANTITY</div>}
      <div className="flex items-center gap-4 text-base">
        <button
          className="rounded border-[1.2px] border-slate-300 px-2"
          onClick={handleQtyDecrease}
        >
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button
          className="rounded border-[1.2px] border-slate-300 px-2"
          onClick={handleQtyIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default SetQuantity;
