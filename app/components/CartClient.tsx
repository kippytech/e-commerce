"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import Heading from "./Heading";
import Button from "./Button";
import ItemContent from "./ItemContent";
import { formattedPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

type CartClientProps = {
  currentUser: SafeUser | null;
};

function CartClient({ currentUser }: CartClientProps) {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your Cart is empty</div>
        <div>
          <Link
            href="/"
            className="mt-2 flex items-center gap-1 text-slate-500"
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  console.log("buana vipi");

  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="mt-8 grid grid-cols-5 items-center gap-4 pb-2 text-xs">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      {cartProducts &&
        cartProducts.map((item) => <ItemContent key={item.id} item={item} />)}
      <div className="flex justify-between gap-4 border-t-[1.5px] border-slate-200 py-4">
        <div className="w-[90]">
          <Button
            label="Clear Cart"
            onClick={() => {
              handleClearCart();
            }}
            small
            outline
          />
        </div>
        <div className="flex flex-col items-start gap-1 text-sm">
          <div className="flex w-full justify-between text-base font-semibold">
            <span className="">Subtotal</span>
            <span className="">{formattedPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and shipping calculated at checkout
          </p>
          <Button
            label={currentUser ? "Checkout" : "Login to checkout"}
            onClick={() => {
              currentUser ? router.push("/checkout") : router.push("/login");
            }}
          />
          <Link
            href="/"
            className="mt-2 flex items-center gap-1 text-slate-500"
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartClient;
